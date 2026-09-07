package com.EHRS.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    @PostConstruct
    public void init() {
        try {
            if (accountSid != null && !accountSid.isEmpty()) {
                Twilio.init(accountSid, authToken);
                System.out.println("Twilio SMS Service Initialized");
            }
        } catch (Exception e) {
            System.out.println("Twilio initialization failed: " + e.getMessage());
        }
    }

    public void sendSecurityAlertSms(String toPhoneNumber, String doctorName) {
        if (toPhoneNumber == null || toPhoneNumber.trim().isEmpty()) return;

        try {
            // Twilio requires the country code! We force +91 (India) if the user didn't enter a plus sign.
            // Change +91 to your country code if you are testing outside India!
            String formattedPhone = toPhoneNumber.startsWith("+") ? toPhoneNumber : "+91" + toPhoneNumber.replaceAll("\\D", "");

            Message message = Message.creator(
                    new PhoneNumber(formattedPhone), // To: Patient's Number
                    new PhoneNumber(twilioPhoneNumber), // From: Your Twilio Number
                    "EHRS SECURITY ALERT: Your medical profile was just accessed by " + doctorName + ". Contact support immediately if you did not authorize this."
            ).create();

            System.out.println("SMS Alert sent successfully to " + formattedPhone + ". SID: " + message.getSid());
        } catch (Exception e) {
            System.out.println("Failed to send Twilio SMS: " + e.getMessage());
        }
    }
}