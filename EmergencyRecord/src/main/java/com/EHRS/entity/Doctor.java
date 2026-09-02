package com.EHRS.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "doctors")
@Data
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String fullName;
    private String phoneNumber;
    private String licenseNumber;
    private String specialty;
    private String hospitalAffiliation;

    // This boolean is what AuthService uses to block login until an Admin approves them!
    private boolean isVerified;
}