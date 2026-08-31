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