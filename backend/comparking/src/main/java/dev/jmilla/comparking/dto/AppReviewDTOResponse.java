package dev.jmilla.comparking.dto;

import java.time.LocalDateTime;

public record AppReviewDTOResponse(
        Long id,
        String username,
        Integer puntuacion,
        String comentario,
        LocalDateTime fecha
) {}

