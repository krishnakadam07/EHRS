package com.EHRS.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String doctorEmail;
    private String patientEmail;
    private String actionType; // e.g., "BREAK_GLASS_OVERRIDE"

    @Column(length = 500)
    private String reason; // The excuse the doctor typed

    private LocalDateTime timestamp = LocalDateTime.now();
}