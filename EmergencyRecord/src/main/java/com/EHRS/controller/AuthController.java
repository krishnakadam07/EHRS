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
<<<<<<< HEAD
import java.util.Collections;

// Google Auth Imports
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

=======

@RestController
@RequestMapping("/api/auth")

public class AuthController {
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

<<<<<<< HEAD
=======

>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
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

<<<<<<< HEAD
            // Fetch the user to return their role to React
=======
            // We just need to fetch the user to return their role to React
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
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
<<<<<<< HEAD
=======
            // If the doctor is not verified, AuthService throws an exception which we catch here
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
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
<<<<<<< HEAD

    // -------------------------------------------------------------------
    // GOOGLE AUTHENTICATION ENDPOINT
    // -------------------------------------------------------------------
    @PostMapping("/google")
    public ResponseEntity<?> googleAuth(@RequestBody Map<String, String> request) {
        String googleToken = request.get("token");
        String requestedRole = request.get("role"); // Will be "patient" or "doctor" from the login tab

        try {
            // Verify the Google Token using your specific Client ID
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList("148865988355-1jhblpdtend7irsl5chfcca2gqic3umk.apps.googleusercontent.com"))
                    .build();

            GoogleIdToken idToken = verifier.verify(googleToken);

            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");

                // Process login via AuthService
                String jwtToken = authService.processGoogleLogin(email, name, requestedRole);

                // Fetch user data to match the exact JSON structure of normal login
                Optional<User> userOpt = userRepository.findByEmail(email);
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    return ResponseEntity.ok(Map.of(
                            "email", user.getEmail(),
                            "role", user.getRole().name().toLowerCase(),
                            "token", jwtToken,
                            "message", "Google Auth Successful"
                    ));
                }

                return ResponseEntity.status(401).body("User not found after Google login");
            } else {
                return ResponseEntity.badRequest().body("Invalid Google Token");
            }
        } catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().contains("pending")) {
                return ResponseEntity.status(403).body(e.getMessage());
            }
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
=======
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
}