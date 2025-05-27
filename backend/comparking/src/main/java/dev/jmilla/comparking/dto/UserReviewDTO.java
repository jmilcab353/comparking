package dev.jmilla.comparking.dto;

import java.time.LocalDateTime;

public record UserReviewDTO(
        Long reviewerId,
        Long reviewedId,
        Long aparcamientoId,
        Integer puntuacion,
        String comentario,
        LocalDateTime fecha
) {}

