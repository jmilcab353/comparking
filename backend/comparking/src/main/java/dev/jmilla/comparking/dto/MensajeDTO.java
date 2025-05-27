package dev.jmilla.comparking.dto;

import java.time.LocalDateTime;

public record MensajeDTO(
        Long emisorId,
        Long receptorId,
        String contenido,
        LocalDateTime fechaEnvio
) {}

