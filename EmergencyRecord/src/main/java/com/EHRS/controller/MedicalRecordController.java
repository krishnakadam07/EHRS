package com.EHRS.controller;

import com.EHRS.entity.MedicalRecord;
import com.EHRS.service.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/records")

@RequiredArgsConstructor
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    @PostMapping("/upload/{email}")
    public ResponseEntity<?> uploadRecord(
            @PathVariable String email,
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("category") String category,
            @RequestParam("dateIssued") String dateIssued,
            @RequestParam("notes") String notes) {

        try {
            MedicalRecord record = medicalRecordService.uploadRecord(email, title, category, dateIssued, notes, file);
            return ResponseEntity.ok("File securely uploaded to AWS S3: " + record.getFileUrl());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/patient/{email}")
    public ResponseEntity<?> getPatientRecords(@PathVariable String email) {
        try {
            List<MedicalRecord> records = medicalRecordService.getPatientRecords(email);
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}