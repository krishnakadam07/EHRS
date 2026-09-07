package com.EHRS.controller;

import com.EHRS.entity.Subscription;
import com.EHRS.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionRepository subscriptionRepository;

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        if (email == null || !email.contains("@")) {
            return ResponseEntity.badRequest().body("Please provide a valid email address.");
        }

        if (subscriptionRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body("This email is already subscribed!");
        }

        Subscription subscription = new Subscription();
        subscription.setEmail(email);
        subscriptionRepository.save(subscription);

        return ResponseEntity.ok("Successfully subscribed to EHRS updates!");
    }
}