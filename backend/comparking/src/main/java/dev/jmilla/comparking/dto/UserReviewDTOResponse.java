package dev.jmilla.comparking.dto;

import java.time.LocalDateTime;

public record UserReviewDTOResponse(
        Long id,
        String reviewer,
        String reviewed,
        String direccionAparcamiento,
        Integer puntuacion,
        String comentario,
        LocalDateTime fecha
) {}

