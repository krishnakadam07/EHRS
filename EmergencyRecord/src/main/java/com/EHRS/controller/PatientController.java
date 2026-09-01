package com.EHRS.controller;

import com.EHRS.dto.request.ProfileUpdateRequest;
import com.EHRS.entity.AccessLog;
import com.EHRS.entity.Patient;
import com.EHRS.entity.Prescription;
import com.EHRS.repository.AccessLogRepository;
import com.EHRS.repository.PrescriptionRepository;
import com.EHRS.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private AccessLogRepository accessLogRepository;

    @Autowired
    private com.EHRS.repository.MedicalRecordRepository medicalRecordRepository;

    // 🌟 ADD THIS inside PatientController:
    @Autowired
    private com.EHRS.repository.NotificationRepository notificationRepository;

    @PostMapping("/report-doctor")
    public ResponseEntity<?> reportSuspiciousActivity(@RequestBody Map<String, String> payload) {
        String patientEmail = payload.get("patientEmail");
        String doctorName = payload.get("doctorName");
        String reason = payload.get("reason");

        // Create a high-priority alert for the Admin
        com.EHRS.entity.Notification adminAlert = new com.EHRS.entity.Notification();
        adminAlert.setPatient(null); // It goes to Admin, not a patient
        adminAlert.setType("FRAUD_ALERT");
        adminAlert.setTitle("🚨 URGENT: Doctor Reported by " + patientEmail);
        adminAlert.setMessage("Doctor: " + doctorName + " | Reason/Proof: " + reason);
        adminAlert.setTime(java.time.LocalDateTime.now().toString());

        notificationRepository.save(adminAlert);

        return ResponseEntity.ok(Map.of("message", "Report securely sent to Admin Investigation Team."));
    }
    @GetMapping("/my-records/{email}")
    public ResponseEntity<?> getMyMedicalRecords(@PathVariable String email) {
        try {
            com.EHRS.entity.Patient patient = patientService.getPatientProfile(email);
            return ResponseEntity.ok(medicalRecordRepository.findByPatient(patient));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    // Fetch Patient's Real Prescriptions
    @GetMapping("/prescriptions/{email}")
    public ResponseEntity<?> getMyPrescriptions(@PathVariable String email) {
        try {
            // Securely grab the patient using your existing service
            Patient patient = patientService.getPatientProfile(email);

            // 🌟 FIX: Search for "PT-[ID]" because the doctor's QR scanner saves it with the PT- prefix!
            String searchId = "PT-" + patient.getId();

            List<Prescription> prescriptions = prescriptionRepository.findByPatientId(searchId);
            return ResponseEntity.ok(prescriptions);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Fetch Patient's Real Security/Access Logs
    @GetMapping("/access-logs/{email}")
    public ResponseEntity<?> getMyAccessLogs(@PathVariable String email) {
        try {
            // Securely grab the patient using your existing service
            Patient patient = patientService.getPatientProfile(email);

            // Fetch the logs linked to this patient
            List<AccessLog> logs = accessLogRepository.findByPatient(patient);
            return ResponseEntity.ok(logs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/dashboard/{email}")
    public ResponseEntity<?> getPatientDashboard(@PathVariable String email) {
        try {
            Patient patient = patientService.getPatientProfile(email);
            return ResponseEntity.ok(patient);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{email}")
    public ResponseEntity<?> updateProfile(@PathVariable String email, @RequestBody ProfileUpdateRequest request) {
        try {
            Patient updatedPatient = patientService.updateHealthProfile(email, request);
            return ResponseEntity.ok("Profile updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    // 🌟 DELETE S3 DOCUMENT
    @DeleteMapping("/records/{id}")
    public ResponseEntity<?> deleteMedicalRecord(@PathVariable Long id) {
        medicalRecordRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Document deleted successfully"));
    }

    // 🌟 DELETE PRESCRIPTION
    @DeleteMapping("/prescriptions/{id}")
    public ResponseEntity<?> deletePrescription(@PathVariable Long id) {
        // Warning: In a real medical app, patients cannot delete doctor prescriptions,
        // but we are enabling it here for your project feature!
        prescriptionRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Prescription deleted successfully"));
    }
}