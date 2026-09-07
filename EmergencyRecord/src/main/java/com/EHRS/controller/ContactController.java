package com.EHRS.controller;

import com.EHRS.entity.ContactMessage;
import com.EHRS.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;

    @PostMapping("/submit")
    public ResponseEntity<?> submitContactMessage(@RequestBody ContactMessage request) {

        if (request.getEmail() == null || request.getMessage() == null) {
            return ResponseEntity.badRequest().body("Email and message are required.");
        }

        // Save the message for Admin Notification in the database
        request.setStatus("UNREAD"); // Notifies admin it's a new message
        contactMessageRepository.save(request);

        return ResponseEntity.ok("Your message has been sent successfully. Our team will review it shortly.");
    }

    // 🛡️ ADMIN ONLY ENDPOINT: Fetch Unread Notifications
    @GetMapping("/admin/notifications")
    public ResponseEntity<?> getAdminNotifications() {
        return ResponseEntity.ok(contactMessageRepository.findByStatus("UNREAD"));
    }
}