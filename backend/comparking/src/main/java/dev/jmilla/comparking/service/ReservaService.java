package dev.jmilla.comparking.service;

import dev.jmilla.comparking.dto.ReservaDTO;
import dev.jmilla.comparking.dto.ReservaDTOResponse;
import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.User;

import java.util.List;
import java.util.Optional;

public interface ReservaService {

    List<ReservaDTOResponse> findAll();

    Optional<ReservaDTOResponse> findById(Long id);

    List<ReservaDTOResponse> findByUsuario(User usuario);

    List<ReservaDTOResponse> findByAparcamiento(Aparcamiento aparcamiento);

    ReservaDTOResponse save(ReservaDTO dto);

    ReservaDTOResponse update(Long id, ReservaDTO dto);

    void deleteById(Long id);
}
