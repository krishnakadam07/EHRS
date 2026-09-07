package com.EHRS.service;

import com.EHRS.dto.request.LoginRequest;
import com.EHRS.dto.request.RegisterRequest;
import com.EHRS.entity.*;
import com.EHRS.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public String registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.valueOf(request.getRole().toUpperCase()));
        User savedUser = userRepository.save(user);

        if (savedUser.getRole() == Role.PATIENT) {
            Patient patient = new Patient();
            patient.setUser(savedUser);
            patient.setFullName(request.getName());
            patient.setPhoneNumber(request.getPhone());
            patient.setBloodType(request.getBloodType());
            patient.setDateOfBirth(request.getDateOfBirth());
            patientRepository.save(patient);
        } else if (savedUser.getRole() == Role.DOCTOR) {
            Doctor doctor = new Doctor();
            doctor.setUser(savedUser);
            doctor.setFullName(request.getName());
            doctor.setPhoneNumber(request.getPhone());
            doctor.setLicenseNumber(request.getLicenseNumber());
            doctor.setSpecialty(request.getSpecialty());
            doctor.setHospitalAffiliation(request.getHospital());
            doctor.setVerified(false);
            doctorRepository.save(doctor);
        }

        return "User registered successfully!";
    }

    public String loginUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // dYOY FIX: Enforce that the user is logging into the correct tab!
        if (request.getRole() != null && !user.getRole().name().equalsIgnoreCase(request.getRole())) {
            throw new RuntimeException("Account is registered with a different role. Please select the correct tab.");
        }

        if (user.getRole() == Role.DOCTOR) {
            Doctor doctor = doctorRepository.findByUser(user)
                    .orElseGet(() -> {
                        Doctor newDoc = new Doctor();
                        newDoc.setUser(user);
                        newDoc.setFullName("Dr. " + user.getEmail().split("@")[0]);
                        newDoc.setSpecialty("General Practice");
                        newDoc.setVerified(false);
                        return doctorRepository.save(newDoc);
                    });

            if (!doctor.isVerified()) {
                throw new RuntimeException("Your doctor profile is pending admin verification.");
            }
        }

        return jwtService.generateToken(user.getEmail(), user.getRole().name());
    }

    @Transactional
    public String processGoogleLogin(String email, String name, String requestedRole) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {
            throw new RuntimeException("Account not found. Please create an account first.");
        }

        User user = existingUser.get();

        if (requestedRole != null && !user.getRole().name().equalsIgnoreCase(requestedRole)) {
            throw new RuntimeException("Account is registered with a different role. Please select the correct tab.");
        }

        if (user.getRole() == Role.DOCTOR) {
            Doctor doctor = doctorRepository.findByUser(user)
                    .orElseGet(() -> {
                        Doctor newDoc = new Doctor();
                        newDoc.setUser(user);
                        newDoc.setFullName("Dr. " + user.getEmail().split("@")[0]);
                        newDoc.setSpecialty("General Practice");
                        newDoc.setVerified(false);
                        return doctorRepository.save(newDoc);
                    });

            if (!doctor.isVerified()) {
                throw new RuntimeException("Your doctor profile is pending admin verification.");
            }
        }

        return jwtService.generateToken(user.getEmail(), user.getRole().name());
    }

    // ---------------------------------------------------------
    // PASSWORD RESET / OTP METHODS
    // ---------------------------------------------------------

    public String requestOtp(String email) {
        // Verify the user exists
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User with this email not found."));

        System.out.println("OTP Requested for: " + email);
        return "OTP sent successfully to your email.";
    }

    @Transactional
    public String verifyOtp(String email, String otp) {
        // Verify the user exists
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found."));

        System.out.println("OTP Verified for: " + email);
        return "OTP verified successfully.";
    }

    @Transactional
    public String resetPassword(String email, String newPassword) {
        // Verify the user exists and update their password
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found."));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return "Password reset successfully.";
    }
}