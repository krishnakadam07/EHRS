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

            // Find prescriptions using the patient's ID
            List<Prescription> prescriptions = prescriptionRepository.findByPatientId(String.valueOf(patient.getId()));
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
}