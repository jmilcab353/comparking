package dev.jmilla.comparking.dto;

import java.time.LocalDateTime;

public record DenunciaDTO(
        Long denuncianteId,
        Long denunciadoId,
        Long aparcamientoId,
        String descripcion,
        String imagen,
        LocalDateTime fecha,
        String estado
) {}

