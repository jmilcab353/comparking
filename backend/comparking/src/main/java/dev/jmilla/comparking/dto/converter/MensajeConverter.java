package dev.jmilla.comparking.dto.converter;

import dev.jmilla.comparking.dto.MensajeDTO;
import dev.jmilla.comparking.dto.MensajeDTOResponse;
import dev.jmilla.comparking.entity.Mensaje;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MensajeConverter {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public Mensaje toEntity(MensajeDTO dto) {
        User emisor = userRepository.findById(dto.emisorId())
                .orElseThrow(() -> new RuntimeException("Emisor no encontrado"));
        User receptor = userRepository.findById(dto.receptorId())
                .orElseThrow(() -> new RuntimeException("Receptor no encontrado"));

        Mensaje mensaje = new Mensaje();
        mensaje.setEmisor(emisor);
        mensaje.setReceptor(receptor);
        mensaje.setContenido(dto.contenido());
        mensaje.setFechaEnvio(dto.fechaEnvio());

        return mensaje;
    }

    public MensajeDTOResponse toDtoResponse(Mensaje mensaje) {
        return new MensajeDTOResponse(
                mensaje.getIdMensaje(),
                mensaje.getEmisor().getUsername(),
                mensaje.getReceptor().getUsername(),
                mensaje.getContenido(),
                mensaje.getFechaEnvio()
        );
    }

    public Mensaje toEntityMapper(MensajeDTO dto) {
        return modelMapper.map(dto, Mensaje.class);
    }

    public MensajeDTO toDtoMapper(Mensaje mensaje) {
        return modelMapper.map(mensaje, MensajeDTO.class);
    }
}
