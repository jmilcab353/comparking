package dev.jmilla.comparking.dto;

import java.time.LocalDateTime;

public record AppReviewDTO(
        Long userId,
        Integer puntuacion,
        String comentario,
        LocalDateTime fecha
) {}
