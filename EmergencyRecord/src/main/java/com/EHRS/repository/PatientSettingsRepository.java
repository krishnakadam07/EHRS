package com.EHRS.repository;

import com.EHRS.entity.PatientSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PatientSettingsRepository extends JpaRepository<PatientSettings, Long> {
    Optional<PatientSettings> findByEmail(String email);
}