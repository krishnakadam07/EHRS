package com.EHRS.dto.request;
import lombok.Data;
@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String phone;
    private String role;
    private String specialty;
    private String hospital;
    private String licenseNumber;
    private String bloodType;
    private String dateOfBirth;
}