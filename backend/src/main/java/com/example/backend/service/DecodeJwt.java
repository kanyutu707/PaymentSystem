package com.example.backend.service;

import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Base64;
import java.util.Map;

@Service
public class DecodeJwt {

    public Long decodeJwt(String authHeader) {
        try {

            if (authHeader.startsWith("Bearer ")) {
                authHeader = authHeader.substring(7);
            }


            String[] pieces = authHeader.split("\\.");
            if (pieces.length < 2) {
                throw new IllegalArgumentException("Invalid JWT token");
            }


            Base64.Decoder decoder = Base64.getUrlDecoder();
            String payloadJson = new String(decoder.decode(pieces[1]));


            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> payloadMap = objectMapper.readValue(payloadJson, Map.class);


            Object userIdObj = payloadMap.get("userId");
            if (userIdObj instanceof Number) {
                return ((Number) userIdObj).longValue();
            } else if (userIdObj instanceof String) {
                return Long.parseLong((String) userIdObj);
            } else {
                throw new IllegalArgumentException("userId not found or of unknown type");
            }

        } catch (Exception e) {

            throw new RuntimeException("Failed to decode JWT: " + e.getMessage(), e);
        }
    }
}
