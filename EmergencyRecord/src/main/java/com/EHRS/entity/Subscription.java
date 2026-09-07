package com.EHRS.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    private LocalDateTime subscribedAt;

    @PrePersist
    protected void onCreate() {
        subscribedAt = LocalDateTime.now();
    }
}