package com.EHRS.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/doctor/triage")
public class AiTriageController {

    private final ChatClient chatClient;

    public AiTriageController(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @PostMapping("/analyze")
    public String analyzeVitals(@RequestBody Map<String, String> vitals) {
        try {
            String promptText = String.format(
                    "Analyze vitals: Age:%s, Temp:%sC, BP:%s/%s, HR:%s, SpO2:%s%%. " +
                            "Return ONLY a JSON object with this exact structure, with no markdown formatting: " +
                            "{\"score\":\"Stable\" or \"Warning\" or \"Critical\", \"recommendation\":\"clinical recommendation here\", \"confidence\":\"96%%\"}",
                    vitals.get("age"), vitals.get("temperature"),
                    vitals.get("systolicBP"), vitals.get("diastolicBP"),
                    vitals.get("heartRate"), vitals.get("spo2")
            );

            String response = this.chatClient.prompt()
                    .user(promptText)
                    .call()
                    .content();

            // Clean up Markdown JSON blocks if the AI adds them
            if (response != null) {
                response = response.replaceAll("```json", "").replaceAll("```", "").trim();
            }
            return response;

        } catch (Exception e) {
            e.printStackTrace(); // Print the actual error to your IntelliJ console
            throw new RuntimeException("AI Triage Error: " + e.getMessage());
        }
    }
}