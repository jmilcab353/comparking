package dev.jmilla.comparking.dto;

public record UserDTO(
        String username,
        String password,
        String nombre,
        String apellidos,
        String dni,
        String foto,
        Float saldo,
        Float depositos,
        String role
) {}

