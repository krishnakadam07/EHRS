package com.EHRS.dto.response;
import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String message;
}