package dev.jmilla.comparking.service;

import dev.jmilla.comparking.dto.DenunciaDTO;
import dev.jmilla.comparking.dto.DenunciaDTOResponse;
import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.User;

import java.util.List;
import java.util.Optional;

public interface DenunciaService {

    List<DenunciaDTOResponse> findAll();

    Optional<DenunciaDTOResponse> findById(Long id);

    List<DenunciaDTOResponse> findByDenunciante(User denunciante);

    List<DenunciaDTOResponse> findByDenunciado(User denunciado);

    List<DenunciaDTOResponse> findByAparcamiento(Aparcamiento aparcamiento);

    DenunciaDTOResponse save(DenunciaDTO dto);

    DenunciaDTOResponse updateEstado(Long id, String nuevoEstado);

    void deleteById(Long id);
}

