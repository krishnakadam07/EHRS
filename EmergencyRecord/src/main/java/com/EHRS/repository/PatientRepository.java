package com.EHRS.repository;
import com.EHRS.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByUserEmail(String email);
    Optional<Patient> findByEmergencyToken(String token);

}