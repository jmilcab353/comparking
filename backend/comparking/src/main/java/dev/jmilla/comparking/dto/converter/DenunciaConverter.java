package dev.jmilla.comparking.dto.converter;

import dev.jmilla.comparking.dto.DenunciaDTO;
import dev.jmilla.comparking.dto.DenunciaDTOResponse;
import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.Denuncia;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.repository.AparcamientoRepository;
import dev.jmilla.comparking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DenunciaConverter {

    private final UserRepository userRepository;
    private final AparcamientoRepository aparcamientoRepository;
    private final ModelMapper modelMapper;

    public Denuncia toEntity(DenunciaDTO dto) {
        User denunciante = userRepository.findById(dto.denuncianteId())
                .orElseThrow(() -> new RuntimeException("Denunciante no encontrado"));
        User denunciado = userRepository.findById(dto.denunciadoId())
                .orElseThrow(() -> new RuntimeException("Denunciado no encontrado"));
        Aparcamiento aparcamiento = aparcamientoRepository.findById(dto.aparcamientoId())
                .orElseThrow(() -> new RuntimeException("Aparcamiento no encontrado"));

        Denuncia denuncia = new Denuncia();
        denuncia.setDenunciante(denunciante);
        denuncia.setDenunciado(denunciado);
        denuncia.setAparcamiento(aparcamiento);
        denuncia.setDescripcion(dto.descripcion());
        denuncia.setImagen(dto.imagen());
        denuncia.setFecha(dto.fecha());
        denuncia.setEstado(dto.estado());
        return denuncia;
    }

    public DenunciaDTOResponse toDtoResponse(Denuncia denuncia) {
        return new DenunciaDTOResponse(
                denuncia.getIdDenuncia(),
                denuncia.getDenunciante().getUsername(),
                denuncia.getDenunciado().getUsername(),
                denuncia.getAparcamiento().getDireccion(),
                denuncia.getDescripcion(),
                denuncia.getImagen(),
                denuncia.getFecha(),
                denuncia.getEstado()
        );
    }

    public Denuncia toEntityMapper(DenunciaDTO dto) {
        return modelMapper.map(dto, Denuncia.class);
    }

    public DenunciaDTO toDtoMapper(Denuncia denuncia) {
        return modelMapper.map(denuncia, DenunciaDTO.class);
    }
}

