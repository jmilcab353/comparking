package dev.jmilla.comparking.service;

import dev.jmilla.comparking.dto.AppReviewDTO;
import dev.jmilla.comparking.dto.AppReviewDTOResponse;
import dev.jmilla.comparking.entity.User;

import java.util.List;
import java.util.Optional;

public interface AppReviewService {

    List<AppReviewDTOResponse> findAll();

    Optional<AppReviewDTOResponse> findById(Long id);

    List<AppReviewDTOResponse> findByUser(User user);

    AppReviewDTOResponse save(AppReviewDTO dto);

    void deleteById(Long id);
}

