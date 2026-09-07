package com.EHRS.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.Media;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api/patient/ai")

public class AiAnalysisController {

    private final ChatClient chatClient;

    public AiAnalysisController(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @PostMapping("/analyze-report")
    public String analyzeReport(@RequestBody Map<String, String> payload) {
        try {
            String base64Image = payload.get("image");
            String mimeTypeStr = payload.get("mimeType");

            // 🌟 SAFEST DECODING: Remove any invisible spaces/newlines React might have added
            base64Image = base64Image.replaceAll("\\s+", "");

            byte[] imageBytes = Base64.getDecoder().decode(base64Image);
            ByteArrayResource imageResource = new ByteArrayResource(imageBytes);

            String promptText = "You are an expert holistic medical AI. Analyze this lab report image. Extract key findings but do NOT prescribe medicine. " +
                    "Return ONLY a valid JSON object matching this exact structure: " +
                    "{ \"diagnosis\": \"Primary Finding\", \"summary\": \"What it means\", \"dietPlan\": [\"item 1\", \"item 2\"], \"physicalPlan\": [\"item 1\"], \"confidence\": \"96%\" } " +
                    "Do NOT include markdown formatting or backticks, just the raw JSON.";

            return this.chatClient.prompt()
                    .user(u -> u.text(promptText)
                            .media(new Media(MimeTypeUtils.parseMimeType(mimeTypeStr), imageResource)))
                    .call()
                    .content();

        } catch (Exception e) {
            // 🌟 PRINT THE EXACT ERROR IN INTELLIJ CONSOLE!
            System.err.println("=== AI ANALYSIS CRASHED ===");
            e.printStackTrace();
            throw new RuntimeException("AI failed: " + e.getMessage());
        }
    }
}