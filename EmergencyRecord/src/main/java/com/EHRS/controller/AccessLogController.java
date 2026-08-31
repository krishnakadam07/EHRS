package com.EHRS.controller;

import com.EHRS.entity.AccessLog;
import com.EHRS.entity.Patient;
import com.EHRS.repository.AccessLogRepository;
import com.EHRS.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/access-logs")

public class AccessLogController {

    @Autowired
    private AccessLogRepository accessLogRepository;
    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/{email}")
    public ResponseEntity<?> getAccessHistory(@PathVariable String email) {
        Optional<Patient> patient = patientRepository.findByUserEmail(email);
        if (patient.isEmpty()) return ResponseEntity.badRequest().body("Patient not found");

        List<AccessLog> logs = accessLogRepository.findByPatientId(patient.get().getId());
        return ResponseEntity.ok(logs);
    }

    @PutMapping("/revoke/{logId}")
    public ResponseEntity<?> revokeAccess(@PathVariable Long logId) {
        Optional<AccessLog> log = accessLogRepository.findById(logId);
        if (log.isPresent()) {
            AccessLog accessLog = log.get();
            accessLog.setStatus("Revoked");
            accessLogRepository.save(accessLog);
            return ResponseEntity.ok("Access revoked");
        }
        return ResponseEntity.badRequest().body("Log not found");
    }
}