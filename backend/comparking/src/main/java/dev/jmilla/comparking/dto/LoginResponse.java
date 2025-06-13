package dev.jmilla.comparking.dto;

public record LoginResponse(Long id, String role, String token, String username) {
}
