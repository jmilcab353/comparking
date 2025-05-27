package dev.jmilla.comparking.dto.converter;

import dev.jmilla.comparking.dto.TruequeDTO;
import dev.jmilla.comparking.dto.TruequeDTOResponse;
import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.Reserva;
import dev.jmilla.comparking.entity.Trueque;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.repository.AparcamientoRepository;
import dev.jmilla.comparking.repository.ReservaRepository;
import dev.jmilla.comparking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TruequeConverter {

    private final UserRepository userRepository;
    private final ReservaRepository reservaRepository;
    private final AparcamientoRepository aparcamientoRepository;
    private final ModelMapper modelMapper;

    public Trueque toEntity(TruequeDTO dto) {
        User usuario = userRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Reserva reserva = reservaRepository.findById(dto.reservaId())
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
        Aparcamiento solicitado = aparcamientoRepository.findById(dto.parkSolicitadoId())
                .orElseThrow(() -> new RuntimeException("Aparcamiento solicitado no encontrado"));
        Aparcamiento ofrecido = aparcamientoRepository.findById(dto.parkOfrecidoId())
                .orElseThrow(() -> new RuntimeException("Aparcamiento ofrecido no encontrado"));

        Trueque trueque = new Trueque();
        trueque.setUsuario(usuario);
        trueque.setReserva(reserva);
        trueque.setParkSolicitado(solicitado);
        trueque.setParkOfrecido(ofrecido);
        trueque.setEstado(dto.estado());
        trueque.setFechaInicio(dto.fechaInicio());
        trueque.setFechaFin(dto.fechaFin());
        return trueque;
    }

    public TruequeDTOResponse toDtoResponse(Trueque trueque) {
        return new TruequeDTOResponse(
                trueque.getIdTrueque(),
                trueque.getUsuario().getUsername(),
                trueque.getParkSolicitado().getDireccion(),
                trueque.getParkOfrecido().getDireccion(),
                trueque.getEstado(),
                trueque.getFechaInicio(),
                trueque.getFechaFin()
        );
    }

    public Trueque toEntityMapper(TruequeDTO dto) {
        return modelMapper.map(dto, Trueque.class);
    }

    public TruequeDTO toDtoMapper(Trueque trueque) {
        return modelMapper.map(trueque, TruequeDTO.class);
    }
}

