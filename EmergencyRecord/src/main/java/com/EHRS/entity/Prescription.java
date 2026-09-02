package com.EHRS.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "prescriptions")
@Data
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientId; // The ID from the scanned QR code
    private String doctorEmail; // To track which doctor issued it

    private String medicationName;
    private String dosage;
    private String frequency;
    private String duration;
    private String notes;

    private LocalDate dateIssued = LocalDate.now();
}