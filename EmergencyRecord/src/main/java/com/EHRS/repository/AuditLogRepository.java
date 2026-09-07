package com.EHRS.repository;

import com.EHRS.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByPatientEmailOrderByTimestampDesc(String email);
    List<AuditLog> findAllByOrderByTimestampDesc(); // For the Admin to see everything
}