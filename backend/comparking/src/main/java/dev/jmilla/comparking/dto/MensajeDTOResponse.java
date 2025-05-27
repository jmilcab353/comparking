package dev.jmilla.comparking.dto;

import java.time.LocalDateTime;

public record MensajeDTOResponse(
        Long id,
        String emisor,
        String receptor,
        String contenido,
        LocalDateTime fechaEnvio
) {}
