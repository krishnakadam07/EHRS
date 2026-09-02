package com.EHRS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("🔒 Your EHRS Verification Code");
        message.setText("Hello,\n\n" +
                "You requested a password reset/verification code. Your 6-digit code is:\n\n" +
                otp + "\n\n" +
                "If you did not request this, please ignore this email.\n\n" +
                "EHRS Security Team");
        mailSender.send(message);
    }

    public void sendSecurityAlert(String toEmail, String doctorName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("🚨 EHRS Security Alert: Medical Profile Accessed");

        message.setText("Hello,\n\n" +
                "Your EHRS Emergency Medical Profile was just accessed by " + doctorName + ".\n\n" +
                "If you did not authorize this, please log into your portal and click 'Report' immediately.\n\n" +
                "Stay Safe,\n" +
                "EHRS Security Team");

        mailSender.send(message);
    }
}