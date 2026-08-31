package com.EHRS.repository;

import com.EHRS.entity.MedicalRecord;
import com.EHRS.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    // Corrected to match your Service!
    List<MedicalRecord> findByPatient(Patient patient);
}