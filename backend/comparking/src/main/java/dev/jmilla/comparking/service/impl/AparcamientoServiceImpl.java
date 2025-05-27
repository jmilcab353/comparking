package dev.jmilla.comparking.service.impl;

import dev.jmilla.comparking.dto.AparcamientoDTO;
import dev.jmilla.comparking.dto.AparcamientoDTOResponse;
import dev.jmilla.comparking.dto.converter.AparcamientoConverter;
import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.repository.AparcamientoRepository;
import dev.jmilla.comparking.repository.UserRepository;
import dev.jmilla.comparking.service.AparcamientoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AparcamientoServiceImpl implements AparcamientoService {

    private final AparcamientoRepository repository;
    private final AparcamientoConverter converter;
    private final UserRepository userRepository;

    @Override
    public List<AparcamientoDTOResponse> findAll() {
        return repository.findAll().stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public Optional<AparcamientoDTOResponse> findById(Long id) {
        return repository.findById(id)
                .map(converter::toDtoResponse);
    }

    @Override
    public List<AparcamientoDTOResponse> findByUsuario(User usuario) {
        return repository.findByUser(usuario).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public List<AparcamientoDTOResponse> findByLocalidad(String localidad) {
        return repository.findByLocalidad(localidad).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public List<AparcamientoDTOResponse> findByProvincia(String provincia) {
        return repository.findByProvincia(provincia).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public AparcamientoDTOResponse save(AparcamientoDTO dto) {
        Aparcamiento aparcamiento = converter.toEntity(dto);
        return converter.toDtoResponse(repository.save(aparcamiento));
    }

    @Override
    public AparcamientoDTOResponse update(Long id, AparcamientoDTO dto) {
        return repository.findById(id).map(existing -> {
            Aparcamiento updated = converter.toEntity(dto);
            updated.setIdAparcamiento(id);
            return converter.toDtoResponse(repository.save(updated));
        }).orElseThrow(() -> new RuntimeException("Aparcamiento no encontrado"));
    }

    @Override
    public void deleteById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Aparcamiento no encontrado");
        }
    }

    @Override
    public List<AparcamientoDTOResponse> findAllByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return repository.findByUser(user).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

}
