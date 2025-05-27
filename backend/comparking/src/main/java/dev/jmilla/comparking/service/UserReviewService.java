package dev.jmilla.comparking.service;

import dev.jmilla.comparking.dto.UserReviewDTO;
import dev.jmilla.comparking.dto.UserReviewDTOResponse;
import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserReviewService {

    List<UserReviewDTOResponse> findAll();

    Optional<UserReviewDTOResponse> findById(Long id);

    List<UserReviewDTOResponse> findByReviewer(User reviewer);

    List<UserReviewDTOResponse> findByReviewed(User reviewed);

    List<UserReviewDTOResponse> findByAparcamiento(Aparcamiento aparcamiento);

    UserReviewDTOResponse save(UserReviewDTO dto);

    void deleteById(Long id);
}

