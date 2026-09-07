package com.EHRS.controller;

import com.EHRS.entity.AuditLog;
import com.EHRS.entity.Patient;
import com.EHRS.repository.AuditLogRepository;
import com.EHRS.repository.PatientRepository;
import com.EHRS.service.SecurityAlertService;
import com.EHRS.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Arrays;
import java.util.Collections;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/emergency")
@RequiredArgsConstructor
public class BreakGlassController {

    private final PatientRepository patientRepository;
    private final AuditLogRepository auditLogRepository;
    private final SecurityAlertService securityAlertService;
    private final EmailService emailService;

    @PostMapping("/break-glass")
    public ResponseEntity<?> forceEmergencyAccess(@RequestBody Map<String, String> request) {
        try {
            String patientId = request.get("patientId");
            String doctorEmail = request.get("doctorEmail");
            String reason = request.get("reason");

            Long dbId = Long.parseLong(patientId.replace("PT-", ""));
            Optional<Patient> patientOpt = patientRepository.findById(dbId);

            if (patientOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Patient not found in system.");
            }

            Patient patient = patientOpt.get();
            String patientEmail = patient.getUser().getEmail();

            // 1. ADMIN LOG
            AuditLog log = new AuditLog();
            log.setDoctorEmail(doctorEmail);
            log.setPatientEmail(patientEmail);
            log.setActionType("BREAK_GLASS_OVERRIDE");
            log.setReason(reason);
            auditLogRepository.save(log);

            // 2. PATIENT ALERTS (Live Socket + Email)
            try {
                securityAlertService.triggerEmergencyAccessAlert(
                        patientEmail,
                        "OVERRIDE WARNING: A doctor (" + doctorEmail + ") forced access to your profile. Reason: " + reason
                );
                emailService.sendSecurityAlert(patientEmail, doctorEmail);
            } catch (Exception e) {
                System.out.println("Alerts failed. Error: " + e.getMessage());
            }

            // 3. PACKAGE DATA FOR REACT
            Map<String, Object> criticalData = new HashMap<>();
            criticalData.put("id", "PT-" + patient.getId());
            criticalData.put("name", patient.getFullName() != null ? patient.getFullName() : "Unknown");
            criticalData.put("age", patient.getDateOfBirth() != null ? patient.getDateOfBirth() : "Unknown");
            criticalData.put("bloodType", patient.getBloodType() != null ? patient.getBloodType() : "Unknown");

            String allergiesStr = patient.getAllergies() != null ? patient.getAllergies() : "None Recorded";
            criticalData.put("allergies", Arrays.asList(allergiesStr.split(",")));

            String diseasesStr = patient.getChronicConditions() != null ? patient.getChronicConditions() : "None Recorded";
            criticalData.put("diseases", Arrays.asList(diseasesStr.split(",")));

            criticalData.put("medications", Collections.emptyList());
            criticalData.put("contacts", Collections.emptyList());
            criticalData.put("verifiedAt", LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")));

            return ResponseEntity.ok(criticalData);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid Request Format");
        }
    }
}