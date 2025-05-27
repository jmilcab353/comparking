package dev.jmilla.comparking.service;

import dev.jmilla.comparking.dto.MensajeDTO;
import dev.jmilla.comparking.dto.MensajeDTOResponse;
import dev.jmilla.comparking.entity.User;

import java.util.List;
import java.util.Optional;

public interface MensajeService {

    List<MensajeDTOResponse> findAll();

    Optional<MensajeDTOResponse> findById(Long id);

    List<MensajeDTOResponse> findByEmisor(Long idEmisor);

    List<MensajeDTOResponse> findByReceptor(Long idReceptor);

    List<MensajeDTOResponse> findConversacion(User emisor, User receptor);

    MensajeDTOResponse save(MensajeDTO dto);

    void deleteById(Long id);
}
