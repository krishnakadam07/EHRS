package com.EHRS.service;

import com.EHRS.entity.Patient;
import com.EHRS.repository.PatientRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PatientServiceTest {

    @Mock
    private PatientRepository patientRepository; // Fake database

    @InjectMocks
    private PatientService patientService; // Real service being tested

    @Test
    public void testGetPatientProfile_Success() {
        // 1. SETUP: Tell the fake database what to do
        Patient mockPatient = new Patient();
        mockPatient.setFullName("John Doe");
        mockPatient.setBloodType("O+");

        when(patientRepository.findByUserEmail("test@patient.com"))
                .thenReturn(Optional.of(mockPatient));

        // 2. EXECUTE: Call your real service code
        Patient result = patientService.getPatientProfile("test@patient.com");

        // 3. ASSERT: Prove that the logic worked correctly
        assertNotNull(result);
        assertEquals("John Doe", result.getFullName());
        assertEquals("O+", result.getBloodType());

        // 4. VERIFY: Prove that your code actually queried the database exactly 1 time
        verify(patientRepository, times(1)).findByUserEmail("test@patient.com");
    }
}