package dev.jmilla.comparking.service.impl;

import dev.jmilla.comparking.dto.TruequeDTO;
import dev.jmilla.comparking.dto.TruequeDTOResponse;
import dev.jmilla.comparking.dto.converter.TruequeConverter;
import dev.jmilla.comparking.entity.Trueque;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.repository.TruequeRepository;
import dev.jmilla.comparking.service.TruequeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TruequeServiceImpl implements TruequeService {

    private final TruequeRepository repository;
    private final TruequeConverter converter;

    @Override
    public List<TruequeDTOResponse> findAll() {
        return repository.findAll().stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public Optional<TruequeDTOResponse> findById(Long id) {
        return repository.findById(id)
                .map(converter::toDtoResponse);
    }

    @Override
    public List<TruequeDTOResponse> findByUsuario(User usuario) {
        return repository.findByUsuario(usuario).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public TruequeDTOResponse save(TruequeDTO dto) {
        Trueque trueque = converter.toEntity(dto);
        Trueque saved = repository.save(trueque);
        return converter.toDtoResponse(saved);
    }

    @Override
    public TruequeDTOResponse update(Long id, TruequeDTO dto) {
        return repository.findById(id)
                .map(existing -> {
                    Trueque updated = converter.toEntity(dto);
                    updated.setIdTrueque(id);
                    Trueque saved = repository.save(updated);
                    return converter.toDtoResponse(saved);
                })
                .orElseThrow(() -> new RuntimeException("Trueque no encontrado"));
    }

    @Override
    public void deleteById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Trueque no encontrado");
        }
    }
}

