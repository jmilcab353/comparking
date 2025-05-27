package dev.jmilla.comparking.dto;

public record UserDTOResponse(
        Long idUser,
        String username,
        String nombre,
        String apellidos,
        String dni,
        String foto,
        Float saldo,
        Float depositos,
        String role
) {}
