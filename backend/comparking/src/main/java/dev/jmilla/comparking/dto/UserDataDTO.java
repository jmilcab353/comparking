package dev.jmilla.comparking.dto;

/**
 * DTO que devuelve los datos básicos del usuario autenticado.
 */
public record UserDataDTO(
        Long id,
        String username,
        String nombre,
        String apellidos,
        String dni,
        String foto,
        String iban,
        Float saldo,
        Float deposito,
        String role
) {
}
