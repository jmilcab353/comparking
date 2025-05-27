package dev.jmilla.comparking.dto;

import java.time.LocalDateTime;

public record ReservaDTO(
        Long usuarioId,
        Long aparcamientoId,
        LocalDateTime fechaInicio,
        LocalDateTime fechaFin,
        String estado,
        String tipoPago,
        Float precioTotal,
        Boolean pagoConfirmado,
        LocalDateTime fechaPago,
        String tipoPagoMs
) {}
