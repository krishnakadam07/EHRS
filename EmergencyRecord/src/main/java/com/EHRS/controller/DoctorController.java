package com.EHRS.controller;

import com.EHRS.entity.Patient;
import com.EHRS.entity.Prescription;
import com.EHRS.repository.DoctorRepository;
import com.EHRS.repository.PatientRepository;
import com.EHRS.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/doctors") // 🌟 Plural to match your frontend API calls!
public class DoctorController {

    @Autowired
    private com.EHRS.repository.UserRepository userRepository;

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

    @GetMapping("/access-logs/{email}")
    public ResponseEntity<?> getDoctorAccessLogs(@PathVariable String email) {
        com.EHRS.entity.User user = userRepository.findByEmail(email).orElse(null);
        com.EHRS.entity.Doctor doctor = (user != null) ? doctorRepository.findByUser(user).orElse(null) : null;

        // Find the doctor's name to search the logs
        String accessorName = (doctor != null && doctor.getFullName() != null) ? doctor.getFullName() : email;

        List<com.EHRS.entity.AccessLog> logs = accessLogRepository.findByAccessor(accessorName);

        // Map it so the frontend can read the Patient's Name!
        List<Map<String, Object>> responseLogs = new ArrayList<>();
        for (com.EHRS.entity.AccessLog log : logs) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", log.getId());
            map.put("timestamp", log.getDate());
            map.put("action", log.getType());
            map.put("status", log.getStatus());
            map.put("ip", log.getLocation());
            map.put("patient", log.getPatient() != null ? log.getPatient().getFullName() : "Unknown");
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

    // Fetch Doctor's Issued Prescriptions (Medical History)
    @GetMapping("/history/{email}")
    public ResponseEntity<?> getIssuedPrescriptions(@PathVariable String email) {
        List<Prescription> prescriptions = prescriptionRepository.findByDoctorEmail(email);
        return ResponseEntity.ok(prescriptions);
    }

    @GetMapping("/profile/{email}")
    public ResponseEntity<?> getDoctorProfile(@PathVariable String email) {
        com.EHRS.entity.User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        com.EHRS.entity.Doctor doctor = doctorRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Doctor profile not found"));

        return ResponseEntity.ok(doctor);
    }

    @PutMapping("/profile/{email}")
    public ResponseEntity<?> updateDoctorProfile(@PathVariable String email, @RequestBody com.EHRS.entity.Doctor updatedData) {
        com.EHRS.entity.User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        com.EHRS.entity.Doctor doctor = doctorRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Doctor profile not found"));

        // Save the updated details from the frontend
        if (updatedData.getFullName() != null) doctor.setFullName(updatedData.getFullName());
        if (updatedData.getHospitalAffiliation() != null) doctor.setHospitalAffiliation(updatedData.getHospitalAffiliation());
        if (updatedData.getLicenseNumber() != null) doctor.setLicenseNumber(updatedData.getLicenseNumber());

        doctorRepository.save(doctor);
        return ResponseEntity.ok(doctor);
    }

    // ==========================================
    // 2. PATIENT & PRESCRIPTION ENDPOINTS
    // ==========================================

    // Add this at the top with your other repositories


    // 🌟 REPLACE your existing getPatientDetails method with this one:
    @GetMapping("/patient/{id}")
    public ResponseEntity<?> getPatientDetails(@PathVariable Long id, @RequestParam String doctorEmail) {
        // 1. Fetch Patient
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        // 2. Fetch Doctor's Name for the log
        com.EHRS.entity.User user = userRepository.findByEmail(doctorEmail).orElse(null);
        com.EHRS.entity.Doctor doctor = (user != null) ? doctorRepository.findByUser(user).orElse(null) : null;
        String accessorName = (doctor != null && doctor.getFullName() != null) ? doctor.getFullName() : doctorEmail;

        // 3. CREATE THE SECURITY ACCESS LOG!
        com.EHRS.entity.AccessLog log = new com.EHRS.entity.AccessLog();
        log.setDate(java.time.LocalDateTime.now().toString());
        log.setAccessor(accessorName);
        log.setType("Emergency Profile Viewed");
        log.setStatus("Granted");
        log.setLocation("Emergency Dept"); // You can dynamically set IP here if you want
        log.setPatient(patient);

        accessLogRepository.save(log); // Saves to DB so patient can see it!

        return ResponseEntity.ok(patient);
    }

    @PostMapping("/prescribe")
    public ResponseEntity<?> issuePrescription(@RequestBody Prescription prescription) {
        prescriptionRepository.save(prescription);
        return ResponseEntity.ok(Map.of("message", "Prescription securely issued and saved!"));
    }
}