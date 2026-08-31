package com.EHRS.controller;

import com.EHRS.entity.PatientSettings;
import com.EHRS.repository.PatientSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {

    @Autowired
    private PatientSettingsRepository settingsRepository;

    @GetMapping("/{email}")
    public ResponseEntity<PatientSettings> getSettings(@PathVariable String email) {
        Optional<PatientSettings> settings = settingsRepository.findByEmail(email);
        if (settings.isPresent()) {
            return ResponseEntity.ok(settings.get());
        }
        // If the user has never saved settings before, return the defaults
        PatientSettings defaultSettings = new PatientSettings();
        defaultSettings.setEmail(email);
        return ResponseEntity.ok(defaultSettings);
    }

    @PutMapping("/{email}")
    public ResponseEntity<PatientSettings> updateSettings(@PathVariable String email, @RequestBody PatientSettings newSettings) {
        Optional<PatientSettings> existing = settingsRepository.findByEmail(email);
        PatientSettings settingsToSave = existing.orElse(new PatientSettings());

        settingsToSave.setEmail(email);
        settingsToSave.setEmailNotifs(newSettings.isEmailNotifs());
        settingsToSave.setSmsNotifs(newSettings.isSmsNotifs());
        settingsToSave.setTwoFactor(newSettings.isTwoFactor());
        settingsToSave.setShareData(newSettings.isShareData());

        settingsRepository.save(settingsToSave);
        return ResponseEntity.ok(settingsToSave);
    }
}