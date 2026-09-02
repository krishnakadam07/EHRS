package com.EHRS.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "access_logs")
@Data
public class AccessLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String accessor;
    private String type;
    private String status;
    private String location;

    // 🌟 ADDED BLOCKCHAIN FIELDS
    private String hash;
    private String previousHash;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @JsonIgnore
    private Patient patient;

    // 🌟 ADDED CRYPTOGRAPHIC HASH GENERATOR
    public void generateHash() {
        String data = date + accessor + type + status + location + previousHash;
        try {
            java.security.MessageDigest digest = java.security.MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(data.getBytes("UTF-8"));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if(hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            this.hash = hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error generating Blockchain Hash", e);
        }
    }
}