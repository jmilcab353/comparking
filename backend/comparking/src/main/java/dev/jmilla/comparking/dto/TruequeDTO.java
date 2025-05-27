package dev.jmilla.comparking.dto;

import java.time.LocalDateTime;

public record TruequeDTO(
        Long usuarioId,
        Long reservaId,
        Long parkSolicitadoId,
        Long parkOfrecidoId,
        String estado,
        LocalDateTime fechaInicio,
        LocalDateTime fechaFin
) {}

