package com.EHRS.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;
import java.util.List;

@Entity
@Table(name = "patients")
@Data
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String fullName;
    private String phoneNumber;
    private String dateOfBirth;
    private String gender;
    private String bloodType;
    private String height;
    private String weight;

    private String allergies;
    private String chronicConditions;

    private String insuranceProvider;
    private String insurancePolicy;
    private String insuranceExpiry;

    @Column(unique = true, nullable = false)
    private String emergencyToken;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EmergencyContact> emergencyContacts;

    @PrePersist
    public void generateToken() {
        if (this.emergencyToken == null) {
            this.emergencyToken = UUID.randomUUID().toString();
        }
    }
}