package dev.jmilla.comparking.service.impl;

import dev.jmilla.comparking.dto.MensajeDTO;
import dev.jmilla.comparking.dto.MensajeDTOResponse;
import dev.jmilla.comparking.dto.converter.MensajeConverter;
import dev.jmilla.comparking.entity.Mensaje;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.repository.MensajeRepository;
import dev.jmilla.comparking.repository.UserRepository;
import dev.jmilla.comparking.service.MensajeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MensajeServiceImpl implements MensajeService {

    private final MensajeRepository repository;
    private final MensajeConverter converter;
    private final UserRepository userRepository;

    @Override
    public List<MensajeDTOResponse> findAll() {
        return repository.findAll().stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public Optional<MensajeDTOResponse> findById(Long id) {
        return repository.findById(id)
                .map(converter::toDtoResponse);
    }

    @Override
    public List<MensajeDTOResponse> findByEmisor(Long idEmisor) {
        User emisor = userRepository.findById(idEmisor)
                .orElseThrow(() -> new RuntimeException("Emisor no encontrado"));
        return repository.findByEmisor(emisor).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public List<MensajeDTOResponse> findByReceptor(Long idReceptor) {
        User receptor = userRepository.findById(idReceptor)
                .orElseThrow(() -> new RuntimeException("Receptor no encontrado"));
        return repository.findByReceptor(receptor).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public List<MensajeDTOResponse> findConversacion(User emisor, User receptor) {
        return repository
                .findByEmisorAndReceptorOrReceptorAndEmisor(emisor, receptor, receptor, emisor)
                .stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public MensajeDTOResponse save(MensajeDTO dto) {
        Mensaje mensaje = converter.toEntity(dto);
        return converter.toDtoResponse(repository.save(mensaje));
    }

    @Override
    public void deleteById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Mensaje no encontrado");
        }
    }
}

