package dev.jmilla.comparking.service;

import dev.jmilla.comparking.dto.AparcamientoDTO;
import dev.jmilla.comparking.dto.AparcamientoDTOResponse;
import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.User;

import java.util.List;
import java.util.Optional;

public interface AparcamientoService {

    List<AparcamientoDTOResponse> findAll();

    Optional<AparcamientoDTOResponse> findById(Long id);

    List<AparcamientoDTOResponse> findByUsuario(User usuario);

    List<AparcamientoDTOResponse> findByLocalidad(String localidad);

    List<AparcamientoDTOResponse> findByProvincia(String provincia);

    AparcamientoDTOResponse save(AparcamientoDTO dto);

    AparcamientoDTOResponse update(Long id, AparcamientoDTO dto);

    void deleteById(Long id);

    List<AparcamientoDTOResponse> findAllByUserId(Long userId);

}

