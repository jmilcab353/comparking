package dev.jmilla.comparking.dto;

import java.time.LocalDateTime;

public record TruequeDTOResponse(
        Long id,
        String usuario,
        String direccionSolicitada,
        String direccionOfrecida,
        String estado,
        LocalDateTime fechaInicio,
        LocalDateTime fechaFin
) {}
