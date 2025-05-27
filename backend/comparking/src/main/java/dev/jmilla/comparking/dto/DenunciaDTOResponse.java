package dev.jmilla.comparking.dto;

import java.time.LocalDateTime;

public record DenunciaDTOResponse(
        Long id,
        String denunciante,
        String denunciado,
        String direccionAparcamiento,
        String descripcion,
        String imagen,
        LocalDateTime fecha,
        String estado
) {}

