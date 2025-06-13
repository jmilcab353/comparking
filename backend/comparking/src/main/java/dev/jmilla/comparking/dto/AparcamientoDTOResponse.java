package dev.jmilla.comparking.dto;

public record AparcamientoDTOResponse(
        Long id,
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
        String usuario,
        Long userId
) {}
