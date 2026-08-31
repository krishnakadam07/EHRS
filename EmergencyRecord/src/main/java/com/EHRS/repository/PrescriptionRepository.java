package com.EHRS.repository;

import com.EHRS.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    List<Prescription> findByPatientId(String patientId);
    List<Prescription> findByDoctorEmail(String doctorEmail);
}