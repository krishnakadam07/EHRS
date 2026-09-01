package com.EHRS.controller;

import com.EHRS.dto.request.LoginRequest;
import com.EHRS.dto.request.RegisterRequest;
import com.EHRS.service.AuthService;
import com.EHRS.repository.UserRepository;
import com.EHRS.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")

public class AuthController {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        try {
            authService.requestOtp(request.get("email"));
            return ResponseEntity.ok(Map.of("message", "OTP sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        try {
            authService.verifyOtp(request.get("email"), request.get("otp"));
            return ResponseEntity.ok(Map.of("message", "OTP verified successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return ResponseEntity.badRequest().body("Incorrect current password");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        try {
            // Your AuthService already checks the password, role, and if the doctor is verified!
            String jwtToken = authService.loginUser(request);

            // We just need to fetch the user to return their role to React
            Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                return ResponseEntity.ok(Map.of(
                        "email", user.getEmail(),
                        "role", user.getRole().name().toLowerCase(),
                        "token", jwtToken
                ));
            }

            return ResponseEntity.status(401).body("User not found after login");

        } catch (Exception e) {
            // If the doctor is not verified, AuthService throws an exception which we catch here
            if (e.getMessage() != null && e.getMessage().contains("pending")) {
                return ResponseEntity.status(403).body(e.getMessage());
            }
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            authService.registerUser(request);
            return ResponseEntity.ok(Map.of("message", "User registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}