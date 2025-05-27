package dev.jmilla.comparking.dto;

import java.time.LocalDateTime;

public record ReservaDTOResponse(
        Long id,
        String usuario,
        String direccionAparcamiento,
        LocalDateTime fechaInicio,
        LocalDateTime fechaFin,
        String estado,
        String tipoPago,
        Float precioTotal,
        Boolean pagoConfirmado,
        LocalDateTime fechaPago,
        String tipoPagoMs
) {}

