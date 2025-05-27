package dev.jmilla.comparking.service.impl;

import dev.jmilla.comparking.dto.DenunciaDTO;
import dev.jmilla.comparking.dto.DenunciaDTOResponse;
import dev.jmilla.comparking.dto.converter.DenunciaConverter;
import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.Denuncia;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.repository.DenunciaRepository;
import dev.jmilla.comparking.service.DenunciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DenunciaServiceImpl implements DenunciaService {

    private final DenunciaRepository repository;
    private final DenunciaConverter converter;

    @Override
    public List<DenunciaDTOResponse> findAll() {
        return repository.findAll().stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public Optional<DenunciaDTOResponse> findById(Long id) {
        return repository.findById(id)
                .map(converter::toDtoResponse);
    }

    @Override
    public List<DenunciaDTOResponse> findByDenunciante(User denunciante) {
        return repository.findByDenunciante(denunciante).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public List<DenunciaDTOResponse> findByDenunciado(User denunciado) {
        return repository.findByDenunciado(denunciado).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public List<DenunciaDTOResponse> findByAparcamiento(Aparcamiento aparcamiento) {
        return repository.findByAparcamiento(aparcamiento).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public DenunciaDTOResponse save(DenunciaDTO dto) {
        Denuncia denuncia = converter.toEntity(dto);
        return converter.toDtoResponse(repository.save(denuncia));
    }

    @Override
    public DenunciaDTOResponse updateEstado(Long id, String nuevoEstado) {
        return repository.findById(id)
                .map(denuncia -> {
                    denuncia.setEstado(nuevoEstado);
                    return converter.toDtoResponse(repository.save(denuncia));
                })
                .orElseThrow(() -> new RuntimeException("Denuncia no encontrada"));
    }

    @Override
    public void deleteById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Denuncia no encontrada");
        }
    }
}

