package com.EHRS.repository;
import com.EHRS.entity.AccessLog;
import com.EHRS.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AccessLogRepository extends JpaRepository<AccessLog, Long> {
    List<AccessLog> findByPatientId(Long patientId);

    List<AccessLog> findByPatient(Patient patient);
    List<AccessLog> findByAccessor(String accessor);
}