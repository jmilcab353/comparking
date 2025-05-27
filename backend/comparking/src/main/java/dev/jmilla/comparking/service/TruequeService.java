package dev.jmilla.comparking.service;

import dev.jmilla.comparking.dto.TruequeDTO;
import dev.jmilla.comparking.dto.TruequeDTOResponse;
import dev.jmilla.comparking.entity.Trueque;
import dev.jmilla.comparking.entity.User;

import java.util.List;
import java.util.Optional;

public interface TruequeService {

    List<TruequeDTOResponse> findAll();

    Optional<TruequeDTOResponse> findById(Long id);

    List<TruequeDTOResponse> findByUsuario(User usuario);

    TruequeDTOResponse save(TruequeDTO dto);

    TruequeDTOResponse update(Long id, TruequeDTO dto);

    void deleteById(Long id);
}

