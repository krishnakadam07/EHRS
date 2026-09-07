package com.EHRS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class SecurityAlertService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void triggerEmergencyAccessAlert(String patientEmail, String doctorName) {
        // Send real-time alert via WebSockets
        messagingTemplate.convertAndSend(
                "/topic/alerts/" + patientEmail,
                Map.of(
                        "title", "🚨 EMERGENCY ACCESS DETECTED",
                        "message", doctorName + " is actively decrypting your medical profile.",
                        "timestamp", System.currentTimeMillis()
                )
        );
    }
}