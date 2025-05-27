package dev.jmilla.comparking.service.impl;

import dev.jmilla.comparking.dto.AppReviewDTO;
import dev.jmilla.comparking.dto.AppReviewDTOResponse;
import dev.jmilla.comparking.dto.converter.AppReviewConverter;
import dev.jmilla.comparking.entity.AppReview;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.repository.AppReviewRepository;
import dev.jmilla.comparking.repository.UserRepository;
import dev.jmilla.comparking.service.AppReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppReviewServiceImpl implements AppReviewService {

    private final AppReviewRepository repository;
    private final AppReviewConverter converter;
    private final UserRepository userRepository;

    @Override
    public List<AppReviewDTOResponse> findAll() {
        return repository.findAll().stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public Optional<AppReviewDTOResponse> findById(Long id) {
        return repository.findById(id)
                .map(converter::toDtoResponse);
    }

    @Override
    public List<AppReviewDTOResponse> findByUser(User user) {
        return repository.findByUser(user).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public List<AppReviewDTOResponse> findByUsuarioId(Long idUser) {
        User usuario = userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return repository.findByUser(usuario).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public AppReviewDTOResponse save(AppReviewDTO dto) {
        AppReview review = converter.toEntity(dto);
        return converter.toDtoResponse(repository.save(review));
    }

    @Override
    public void deleteById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("AppReview no encontrada");
        }
    }

}
