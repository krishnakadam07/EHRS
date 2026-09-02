package com.EHRS.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PatientSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // We link settings directly to the user's email for extremely fast lookups
    private String email;

    private boolean emailNotifs = true;
    private boolean smsNotifs = false;
    private boolean twoFactor = true;
    private boolean shareData = false;
}