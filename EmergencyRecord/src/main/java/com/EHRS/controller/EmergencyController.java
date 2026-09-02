package com.EHRS.controller;

import com.EHRS.entity.Patient;
import com.EHRS.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/emergency")

public class EmergencyController {

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/{token}")
    public ResponseEntity<?> getEmergencyProfileByToken(@PathVariable String token) {
        Optional<Patient> patientOpt = patientRepository.findByEmergencyToken(token);
        if (patientOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid or expired Emergency QR Token.");
        }

        Patient patient = patientOpt.get();
        Map<String, Object> criticalData = new HashMap<>();
        criticalData.put("fullName", patient.getFullName());
        criticalData.put("bloodType", patient.getBloodType());
        criticalData.put("allergies", patient.getAllergies());
        criticalData.put("chronicConditions", patient.getChronicConditions());
        criticalData.put("contacts", patient.getEmergencyContacts());

        return ResponseEntity.ok(criticalData);
    }
}