package dev.jmilla.comparking.dto.converter;

import dev.jmilla.comparking.dto.AparcamientoDTO;
import dev.jmilla.comparking.dto.AparcamientoDTOResponse;
import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AparcamientoConverter {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public Aparcamiento toEntity(AparcamientoDTO dto) {
        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Aparcamiento aparcamiento = new Aparcamiento();
        aparcamiento.setDireccion(dto.direccion());
        aparcamiento.setLocalidad(dto.localidad());
        aparcamiento.setProvincia(dto.provincia());
        aparcamiento.setAncho(dto.ancho());
        aparcamiento.setLargo(dto.largo());
        aparcamiento.setDetalles(dto.detalles());
        aparcamiento.setImagen(dto.imagen());
        aparcamiento.setVideo(dto.video());
        aparcamiento.setTechado(dto.techado());
        aparcamiento.setPrecioHora(dto.precioHora());
        aparcamiento.setPrecioDia(dto.precioDia());
        aparcamiento.setLatitud(dto.latitud());
        aparcamiento.setLongitud(dto.longitud());
        aparcamiento.setPrecioMs(dto.precioMs());
        aparcamiento.setUser(user);

        return aparcamiento;
    }

    public AparcamientoDTOResponse toDtoResponse(Aparcamiento aparcamiento) {
        return new AparcamientoDTOResponse(
                aparcamiento.getIdAparcamiento(),
                aparcamiento.getDireccion(),
                aparcamiento.getLocalidad(),
                aparcamiento.getProvincia(),
                aparcamiento.getAncho(),
                aparcamiento.getLargo(),
                aparcamiento.getDetalles(),
                aparcamiento.getImagen(),
                aparcamiento.getVideo(),
                aparcamiento.getTechado(),
                aparcamiento.getPrecioHora(),
                aparcamiento.getPrecioDia(),
                aparcamiento.getLatitud(),
                aparcamiento.getLongitud(),
                aparcamiento.getPrecioMs(),
                aparcamiento.getUser().getUsername(),
                aparcamiento.getUser().getIdUser()
        );
    }

    public Aparcamiento toEntityMapper(AparcamientoDTO dto) {
        return modelMapper.map(dto, Aparcamiento.class);
    }

    public AparcamientoDTO toDtoMapper(Aparcamiento aparcamiento) {
        return modelMapper.map(aparcamiento, AparcamientoDTO.class);
    }
}

