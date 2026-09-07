package com.EHRS.controller;

import com.EHRS.entity.Patient;
import com.EHRS.entity.Prescription;
import com.EHRS.repository.PatientRepository;
import com.EHRS.repository.PrescriptionRepository;
import com.EHRS.repository.DoctorRepository;
import com.EHRS.repository.UserRepository;
import com.EHRS.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctors")
 // Allows React frontend to communicate with Backend
public class DoctorController {

    @Autowired
    private com.EHRS.service.SmsService smsService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private com.EHRS.repository.MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private com.EHRS.repository.AccessLogRepository accessLogRepository;

    @Autowired
    private com.EHRS.repository.NotificationRepository notificationRepository;

    @GetMapping("/access-logs/{email}")
    public ResponseEntity<?> getDoctorAccessLogs(@PathVariable String email) {
        com.EHRS.entity.User user = userRepository.findByEmail(email).orElse(null);
        com.EHRS.entity.Doctor doctor = (user != null) ? doctorRepository.findByUser(user).orElse(null) : null;

        String accessorName = (doctor != null && doctor.getFullName() != null) ? doctor.getFullName() : email;

        List<com.EHRS.entity.AccessLog> logs = accessLogRepository.findByAccessor(accessorName);

        List<Map<String, Object>> responseLogs = new ArrayList<>();
        for (com.EHRS.entity.AccessLog log : logs) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", log.getId());
            map.put("timestamp", log.getDate());
            map.put("action", log.getType());
            map.put("status", log.getStatus());
            map.put("ip", log.getLocation());
            map.put("patient", log.getPatient() != null ? log.getPatient().getFullName() : "Unknown");
            map.put("hash", log.getHash());

            responseLogs.add(map);
        }

        return ResponseEntity.ok(responseLogs);
    }

    @GetMapping("/patient/{id}/records")
    public ResponseEntity<?> getPatientRecords(@PathVariable Long id) {
        com.EHRS.entity.Patient patient = patientRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(medicalRecordRepository.findByPatient(patient));
    }

    @GetMapping("/patient/{id}/prescriptions")
    public ResponseEntity<?> getPatientPrescriptions(@PathVariable Long id) {
        return ResponseEntity.ok(prescriptionRepository.findByPatientId(String.valueOf(id)));
    }

    @GetMapping("/history/{email}")
    public ResponseEntity<?> getIssuedPrescriptions(@PathVariable String email) {
        List<Prescription> prescriptions = prescriptionRepository.findByDoctorEmail(email);
        return ResponseEntity.ok(prescriptions);
    }

    // 🌟 FIX: Automatically creates a profile if it doesn't exist to prevent 404/500 crashes
    @GetMapping("/profile/{email}")
    public ResponseEntity<?> getDoctorProfile(@PathVariable String email) {
        com.EHRS.entity.User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        com.EHRS.entity.Doctor doctor = doctorRepository.findByUser(user)
                .orElseGet(() -> {
                    com.EHRS.entity.Doctor newDoc = new com.EHRS.entity.Doctor();
                    newDoc.setUser(user);
                    // 🌟 FIX: We extract the name from their Email prefix since User doesn't have a name!
                    newDoc.setFullName("Dr. " + user.getEmail().split("@")[0]);
                    newDoc.setSpecialty("General Practice");
                    newDoc.setVerified(false);
                    return doctorRepository.save(newDoc);
                });
        return ResponseEntity.ok(doctor);
    }

    // 🌟 FIX: Ensure updating works securely without crashing
    @PutMapping("/profile/{email}")
    public ResponseEntity<?> updateDoctorProfile(@PathVariable String email, @RequestBody com.EHRS.entity.Doctor updatedData) {
        com.EHRS.entity.User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        com.EHRS.entity.Doctor doctor = doctorRepository.findByUser(user)
                .orElseGet(() -> {
                    com.EHRS.entity.Doctor newDoc = new com.EHRS.entity.Doctor();
                    newDoc.setUser(user);
                    return newDoc;
                });

        if (updatedData.getFullName() != null) doctor.setFullName(updatedData.getFullName());
        if (updatedData.getHospitalAffiliation() != null) doctor.setHospitalAffiliation(updatedData.getHospitalAffiliation());
        if (updatedData.getLicenseNumber() != null) doctor.setLicenseNumber(updatedData.getLicenseNumber());
        if (updatedData.getSpecialty() != null) doctor.setSpecialty(updatedData.getSpecialty());

        doctorRepository.save(doctor);
        return ResponseEntity.ok(doctor);
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<?> getPatientDetails(@PathVariable Long id, @RequestParam String doctorEmail) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        com.EHRS.entity.User user = userRepository.findByEmail(doctorEmail).orElse(null);
        com.EHRS.entity.Doctor doctor = (user != null) ? doctorRepository.findByUser(user).orElse(null) : null;
        String accessorName = (doctor != null && doctor.getFullName() != null) ? doctor.getFullName() : doctorEmail;

        // 1. SAVE BLOCKCHAIN-ENCRYPTED SECURITY LOG
        com.EHRS.entity.AccessLog log = new com.EHRS.entity.AccessLog();
        log.setDate(java.time.LocalDateTime.now().toString());
        log.setAccessor(accessorName);
        log.setType("Emergency Profile Viewed");
        log.setStatus("Granted");
        log.setLocation("Emergency Dept");
        log.setPatient(patient);

        com.EHRS.entity.AccessLog lastLog = accessLogRepository.findTopByOrderByIdDesc();
        log.setPreviousHash(lastLog != null && lastLog.getHash() != null ? lastLog.getHash() : "0");
        log.generateHash();

        accessLogRepository.save(log);

        // 2. FIRE DATABASE NOTIFICATION TO PATIENT
        com.EHRS.entity.Notification notif = new com.EHRS.entity.Notification();
        notif.setPatient(patient);
        notif.setTitle("Security Alert: Profile Accessed");
        notif.setMessage("Your emergency profile was accessed by " + accessorName + " at " + log.getLocation());
        notif.setType("SECURITY");
        notif.setTime(java.time.LocalDateTime.now().toString());
        notificationRepository.save(notif);

        // 3. FIRE REAL EMAIL ALERT TO PATIENT!
        try {
            System.out.println("Attempting to send security email to: " + patient.getUser().getEmail());
            emailService.sendSecurityAlert(patient.getUser().getEmail(), accessorName);
            System.out.println("Email sent successfully!");
        } catch (Exception e) {
            System.out.println("Email failed to send. Check your application.properties! Error: " + e.getMessage());
        }

        try {
            if (patient.getPhoneNumber() != null && !patient.getPhoneNumber().isEmpty()) {
                smsService.sendSecurityAlertSms(patient.getPhoneNumber(), accessorName);
            }
        } catch (Exception e) {
            System.out.println("SMS failed to send. " + e.getMessage());
        }


        return ResponseEntity.ok(patient);
    }



    @PostMapping("/prescribe")
    public ResponseEntity<?> issuePrescription(@RequestBody Prescription prescription) {
        // 1. SAVE PRESCRIPTION (Saves patientId as "PT-X")
        prescriptionRepository.save(prescription);

        // 2. FIRE DATABASE NOTIFICATION TO PATIENT
        try {
            // FIX: Strip out "PT-" before converting to a Long ID so Java doesn't crash!
            String rawId = prescription.getPatientId().replace("PT-", "");
            Patient patient = patientRepository.findById(Long.parseLong(rawId)).orElse(null);

            if (patient != null) {
                com.EHRS.entity.Notification notif = new com.EHRS.entity.Notification();
                notif.setPatient(patient);
                notif.setTitle("New Prescription Issued");
                notif.setMessage("A new prescription for " + prescription.getMedicationName() + " was securely added to your records.");
                notif.setType("MEDICAL");
                notif.setTime(java.time.LocalDateTime.now().toString());
                notificationRepository.save(notif);
            }
        } catch (Exception e) {
            System.out.println("Notification Error: " + e.getMessage());
        }

        return ResponseEntity.ok(Map.of("message", "Prescription securely issued and saved!"));
    }
}