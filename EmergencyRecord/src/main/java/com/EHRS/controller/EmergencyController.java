package com.EHRS.controller;

import com.EHRS.entity.Patient;
import com.EHRS.repository.PatientRepository;
<<<<<<< HEAD
import com.EHRS.service.SecurityAlertService;
import lombok.RequiredArgsConstructor;
=======
import org.springframework.beans.factory.annotation.Autowired;
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/emergency")
<<<<<<< HEAD
@RequiredArgsConstructor
public class EmergencyController {

    private final PatientRepository patientRepository;

    // 🌟 Inject the new Security Alert Service
    private final SecurityAlertService securityAlertService;
=======

public class EmergencyController {

    @Autowired
    private PatientRepository patientRepository;
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67

    @GetMapping("/{token}")
    public ResponseEntity<?> getEmergencyProfileByToken(@PathVariable String token) {
        Optional<Patient> patientOpt = patientRepository.findByEmergencyToken(token);
        if (patientOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid or expired Emergency QR Token.");
        }

        Patient patient = patientOpt.get();
<<<<<<< HEAD

        // 🚨 TRIGGER THE LIVE ALERT TO THE PATIENT'S PHONE!
        try {
            // We get the patient's email to send it directly to their channel
            String patientEmail = patient.getUser().getEmail();
            securityAlertService.triggerEmergencyAccessAlert(patientEmail, "An Emergency Responder");
        } catch (Exception e) {
            System.out.println("Could not send alert, but continuing data fetch.");
        }

=======
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
        Map<String, Object> criticalData = new HashMap<>();
        criticalData.put("fullName", patient.getFullName());
        criticalData.put("bloodType", patient.getBloodType());
        criticalData.put("allergies", patient.getAllergies());
        criticalData.put("chronicConditions", patient.getChronicConditions());
        criticalData.put("contacts", patient.getEmergencyContacts());

        return ResponseEntity.ok(criticalData);
    }
}