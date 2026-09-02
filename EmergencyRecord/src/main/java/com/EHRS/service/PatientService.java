package com.EHRS.service;

import com.EHRS.dto.request.ProfileUpdateRequest;
import com.EHRS.entity.EmergencyContact;
import com.EHRS.entity.Patient;
import com.EHRS.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public Patient getPatientProfile(String email) {
        return patientRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Patient not found!"));
    }

    public Patient updateHealthProfile(String email, ProfileUpdateRequest request) {
        Optional<Patient> patientOpt = patientRepository.findByUserEmail(email);
        if (patientOpt.isEmpty()) {
            throw new RuntimeException("Patient not found");
        }

        Patient patient = patientOpt.get();
        patient.setFullName(request.getName());
        patient.setPhoneNumber(request.getPhone());
        patient.setDateOfBirth(request.getDob());
        patient.setGender(request.getGender());
        patient.setBloodType(request.getBloodGroup());

        if (request.getAllergies() != null) {
            patient.setAllergies(String.join(", ", request.getAllergies()));
        }

        if (request.getInsurance() != null) {
            patient.setInsuranceProvider(request.getInsurance().getProvider());
            patient.setInsurancePolicy(request.getInsurance().getPolicyNumber());
            patient.setInsuranceExpiry(request.getInsurance().getExpiry());
        }

        if (request.getEmergencyContacts() != null) {
            if (patient.getEmergencyContacts() == null) {
                patient.setEmergencyContacts(new ArrayList<>());
            } else {
                patient.getEmergencyContacts().clear();
            }
            for (ProfileUpdateRequest.ContactDto c : request.getEmergencyContacts()) {
                EmergencyContact contact = new EmergencyContact();
                contact.setName(c.getName());
                contact.setRelation(c.getRelation());
                contact.setPhone(c.getPhone());
                contact.setPatient(patient);
                patient.getEmergencyContacts().add(contact);
            }
        }

        return patientRepository.save(patient);
    }
}