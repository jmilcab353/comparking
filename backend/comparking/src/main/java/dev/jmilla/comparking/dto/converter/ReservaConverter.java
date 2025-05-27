package dev.jmilla.comparking.dto.converter;

import dev.jmilla.comparking.dto.ReservaDTO;
import dev.jmilla.comparking.dto.ReservaDTOResponse;
import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.Reserva;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.repository.AparcamientoRepository;
import dev.jmilla.comparking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReservaConverter {

    private final UserRepository userRepository;
    private final AparcamientoRepository aparcamientoRepository;
    private final ModelMapper modelMapper;

    public Reserva toEntity(ReservaDTO dto) {
        User user = userRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Aparcamiento aparcamiento = aparcamientoRepository.findById(dto.aparcamientoId())
                .orElseThrow(() -> new RuntimeException("Aparcamiento no encontrado"));

        Reserva reserva = new Reserva();
        reserva.setUsuario(user);
        reserva.setAparcamiento(aparcamiento);
        reserva.setFechaInicio(dto.fechaInicio());
        reserva.setFechaFin(dto.fechaFin());
        reserva.setEstado(dto.estado());
        reserva.setTipoPago(dto.tipoPago());
        reserva.setPrecioTotal(dto.precioTotal());
        reserva.setPagoConfirmado(dto.pagoConfirmado());
        reserva.setFechaPago(dto.fechaPago());
        reserva.setTipoPagoMs(dto.tipoPagoMs());
        return reserva;
    }

    public ReservaDTOResponse toDtoResponse(Reserva reserva) {
        return new ReservaDTOResponse(
                reserva.getIdReserva(),
                reserva.getUsuario().getUsername(),
                reserva.getAparcamiento().getDireccion(),
                reserva.getFechaInicio(),
                reserva.getFechaFin(),
                reserva.getEstado(),
                reserva.getTipoPago(),
                reserva.getPrecioTotal(),
                reserva.getPagoConfirmado(),
                reserva.getFechaPago(),
                reserva.getTipoPagoMs()
        );
    }

    public Reserva toEntityMapper(ReservaDTO dto) {
        return modelMapper.map(dto, Reserva.class);
    }

    public ReservaDTO toDtoMapper(Reserva reserva) {
        return modelMapper.map(reserva, ReservaDTO.class);
    }
}

