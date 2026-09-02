package com.EHRS.controller;

import com.EHRS.entity.Notification;
import com.EHRS.entity.Patient;
import com.EHRS.repository.NotificationRepository;
import com.EHRS.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")

public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/{email}")
    public ResponseEntity<?> getNotifications(@PathVariable String email) {
        Optional<Patient> patient = patientRepository.findByUserEmail(email);
        if (patient.isEmpty()) return ResponseEntity.badRequest().body("Patient not found");

        List<Notification> notifications = notificationRepository.findByPatientId(patient.get().getId());
        return ResponseEntity.ok(notifications);
    }

    @PutMapping("/read/{id}")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        Optional<Notification> notif = notificationRepository.findById(id);
        if (notif.isPresent()) {
            Notification n = notif.get();
            n.setUnread(false);
            notificationRepository.save(n);
            return ResponseEntity.ok("Marked as read");
        }
        return ResponseEntity.badRequest().body("Notification not found");
    }
}