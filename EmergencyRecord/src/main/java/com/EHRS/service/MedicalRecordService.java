package com.EHRS.service;

import com.EHRS.entity.MedicalRecord;
import com.EHRS.entity.Patient;
import com.EHRS.repository.MedicalRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicalRecordService {

    private final MedicalRecordRepository recordRepository;
    private final PatientService patientService;
    private final S3Service s3Service;

    public MedicalRecord uploadRecord(String email, String title, String category, String dateIssued, String notes, MultipartFile file) throws IOException {
        Patient patient = patientService.getPatientProfile(email);
        String s3FilePath = s3Service.uploadFile(file, email);

        MedicalRecord record = new MedicalRecord();
        record.setTitle(title);
        record.setCategory(category); // Replaced "type" with "category"
        record.setDateIssued(dateIssued);
        record.setNotes(notes);
        record.setFileUrl(s3FilePath);

        // Auto-fill some nice defaults for patient uploads
        record.setHospital("Patient Upload");
        record.setDoctor("Self-Uploaded");
        record.setStatus("Pending Verification");
        record.setSize((file.getSize() / 1024) + " KB");

        record.setPatient(patient);
        return recordRepository.save(record);
    }

    public List<MedicalRecord> getPatientRecords(String email) {
        Patient patient = patientService.getPatientProfile(email);
        return recordRepository.findByPatient(patient);
    }
}