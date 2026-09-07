package com.EHRS.dto.request;
import lombok.Data;
import java.util.List;

@Data
public class ProfileUpdateRequest {
    private String name;
    private String phone;
    private String dob;
    private String gender;
    private String bloodGroup;
<<<<<<< HEAD
    private String height; // 🌟 ADDED
    private String weight; // 🌟 ADDED
=======
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
    private List<String> allergies;
    private List<String> chronicConditions;
    private List<ContactDto> emergencyContacts;
    private InsuranceDto insurance;

    @Data
    public static class ContactDto {
        private String name;
        private String relation;
        private String phone;
    }

    @Data
    public static class InsuranceDto {
        private String provider;
        private String policyNumber;
        private String expiry;
    }
}