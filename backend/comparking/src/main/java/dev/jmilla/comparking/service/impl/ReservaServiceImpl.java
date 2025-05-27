package dev.jmilla.comparking.service.impl;

import dev.jmilla.comparking.dto.ReservaDTO;
import dev.jmilla.comparking.dto.ReservaDTOResponse;
import dev.jmilla.comparking.dto.converter.ReservaConverter;
import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.Reserva;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.repository.ReservaRepository;
import dev.jmilla.comparking.service.ReservaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReservaServiceImpl implements ReservaService {

    private final ReservaRepository repository;
    private final ReservaConverter converter;

    @Override
    public List<ReservaDTOResponse> findAll() {
        return repository.findAll().stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public Optional<ReservaDTOResponse> findById(Long id) {
        return repository.findById(id)
                .map(converter::toDtoResponse);
    }

    @Override
    public List<ReservaDTOResponse> findByUsuario(User usuario) {
        return repository.findByUsuario(usuario).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public List<ReservaDTOResponse> findByAparcamiento(Aparcamiento aparcamiento) {
        return repository.findByAparcamiento(aparcamiento).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public ReservaDTOResponse save(ReservaDTO dto) {
        Reserva reserva = converter.toEntity(dto);
        Reserva saved = repository.save(reserva);
        return converter.toDtoResponse(saved);
    }

    @Override
    public ReservaDTOResponse update(Long id, ReservaDTO dto) {
        return repository.findById(id).map(existing -> {
            Reserva updated = converter.toEntity(dto);
            updated.setIdReserva(id);
            return converter.toDtoResponse(repository.save(updated));
        }).orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
    }

    @Override
    public void deleteById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Reserva no encontrada");
        }
    }
}

