package com.EHRS.service;

import com.EHRS.dto.request.LoginRequest;
import com.EHRS.dto.request.RegisterRequest;
<<<<<<< HEAD
import com.EHRS.entity.*;
import com.EHRS.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
=======
import com.EHRS.entity.Doctor;
import com.EHRS.entity.Patient;
import com.EHRS.entity.Role;
import com.EHRS.entity.User;
import com.EHRS.repository.DoctorRepository;
import com.EHRS.repository.PatientRepository;
import com.EHRS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67

import java.util.Optional;

@Service
<<<<<<< HEAD
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
=======
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    @Autowired
    private EmailService emailService;

    // Temporary in-memory secure storage for OTPs
    private final java.util.Map<String, String> otpStorage = new java.util.concurrent.ConcurrentHashMap<>();

    public void requestOtp(String email) {
        if (!userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email not found in our system.");
        }
        // Generate a real 6-digit random code
        String otp = String.format("%06d", new java.util.Random().nextInt(999999));

        otpStorage.put(email, otp);
        emailService.sendOtpEmail(email, otp); // 🔥 Sends the actual email!
    }

    public void verifyOtp(String email, String otp) {
        String storedOtp = otpStorage.get(email);
        if (storedOtp == null || !storedOtp.equals(otp)) {
            throw new RuntimeException("Invalid or expired OTP code.");
        }
        // Success! Remove it so it can't be reused by hackers.
        otpStorage.remove(email);
    }

    public String loginUser(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return jwtService.generateToken(user.getEmail(), user.getRole().name());
            }
        }
        throw new RuntimeException("Invalid Credentials");
    }

    public void registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.valueOf(request.getRole().toUpperCase()));
<<<<<<< HEAD
=======

>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
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
<<<<<<< HEAD
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
=======
            doctor.setSpecialty(request.getSpecialty());
            doctor.setHospitalAffiliation(request.getHospital());
            doctor.setLicenseNumber(request.getLicenseNumber());
            doctorRepository.save(doctor);
        }
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
    }
}