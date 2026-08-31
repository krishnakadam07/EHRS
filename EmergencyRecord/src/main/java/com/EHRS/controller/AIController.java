package com.EHRS.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @PostMapping("/triage/predict")
    public ResponseEntity<?> predictTriage(@RequestBody Map<String, Integer> vitals) {
        // Fallbacks if data is missing
        int sbp = vitals.getOrDefault("systolicBP", 120);
        int hr = vitals.getOrDefault("heartRate", 80);
        int spo2 = vitals.getOrDefault("spo2", 98);

        Map<String, String> result = new HashMap<>();
        if (sbp < 90 || hr > 120 || spo2 < 92) {
            result.put("score", "Critical");
            result.put("confidence", "98.7%");
            result.put("recommendation", "Immediate intervention required. High risk of decompensation.");
        } else if (sbp > 160 || hr > 100 || spo2 < 95) {
            result.put("score", "Urgent");
            result.put("confidence", "89.4%");
            result.put("recommendation", "Monitor closely. Consider supplemental oxygen and IV access.");
        } else {
            result.put("score", "Stable");
            result.put("confidence", "94.2%");
            result.put("recommendation", "Routine observation. Vitals are within normal limits.");
        }

        return ResponseEntity.ok(result);
    }

    @PostMapping("/analyze-report")
    public ResponseEntity<?> analyzeReport(@RequestParam("file") MultipartFile file) {
        // In a real application, you would send this file to AWS Textract or OpenAI Vision API here
        Map<String, Object> result = new HashMap<>();
        result.put("diagnosis", "Mild Iron Deficiency Anemia");
        result.put("summary", "Your blood report indicates slightly lower than normal hemoglobin levels and low ferritin. This suggests a mild iron deficiency.");
        result.put("confidence", "94.2%");
        result.put("recommendations", Arrays.asList(
                "Increase intake of iron-rich foods (spinach, red meat, lentils).",
                "Consider a Vitamin C supplement to boost iron absorption.",
                "Consult with your primary care physician to discuss a potential iron supplement."
        ));
        return ResponseEntity.ok(result);
    }
}