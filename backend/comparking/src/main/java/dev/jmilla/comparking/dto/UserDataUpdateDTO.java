package dev.jmilla.comparking.dto;

public record UserDataUpdateDTO(
        String nombre,
        String apellidos,
        String dni,
        String foto,
        String iban,
        String username,
        Float saldo
) {}
