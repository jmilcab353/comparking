package dev.jmilla.comparking.service.impl;

import dev.jmilla.comparking.dto.UserReviewDTO;
import dev.jmilla.comparking.dto.UserReviewDTOResponse;
import dev.jmilla.comparking.dto.converter.UserReviewConverter;
import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.entity.UserReview;
import dev.jmilla.comparking.repository.UserReviewRepository;
import dev.jmilla.comparking.service.UserReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserReviewServiceImpl implements UserReviewService {

    private final UserReviewRepository repository;
    private final UserReviewConverter converter;

    @Override
    public List<UserReviewDTOResponse> findAll() {
        return repository.findAll().stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public Optional<UserReviewDTOResponse> findById(Long id) {
        return repository.findById(id)
                .map(converter::toDtoResponse);
    }

    @Override
    public List<UserReviewDTOResponse> findByReviewer(User reviewer) {
        return repository.findByReviewer(reviewer).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public List<UserReviewDTOResponse> findByReviewed(User reviewed) {
        return repository.findByReviewed(reviewed).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public List<UserReviewDTOResponse> findByAparcamiento(Aparcamiento aparcamiento) {
        return repository.findByAparcamiento(aparcamiento).stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public UserReviewDTOResponse save(UserReviewDTO dto) {
        UserReview review = converter.toEntity(dto);
        return converter.toDtoResponse(repository.save(review));
    }

    @Override
    public void deleteById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("UserReview no encontrada");
        }
    }
}

