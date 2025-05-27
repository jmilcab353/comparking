package dev.jmilla.comparking.dto;

public record AparcamientoDTO(
        String direccion,
        String localidad,
        String provincia,
        Float ancho,
        Float largo,
        String detalles,
        String imagen,
        String video,
        Boolean techado,
        Float precioHora,
        Float precioDia,
        Double latitud,
        Double longitud,
        Float precioMs,
        Long userId
) {}

