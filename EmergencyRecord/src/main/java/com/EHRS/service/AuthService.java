package com.EHRS.service;

import com.EHRS.dto.request.LoginRequest;
import com.EHRS.dto.request.RegisterRequest;
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

import java.util.Optional;

@Service
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
            doctor.setSpecialty(request.getSpecialty());
            doctor.setHospitalAffiliation(request.getHospital());
            doctor.setLicenseNumber(request.getLicenseNumber());
            doctorRepository.save(doctor);
        }
    }
}