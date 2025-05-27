package dev.jmilla.comparking.dto.converter;

import dev.jmilla.comparking.dto.UserReviewDTO;
import dev.jmilla.comparking.dto.UserReviewDTOResponse;
import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.entity.UserReview;
import dev.jmilla.comparking.repository.AparcamientoRepository;
import dev.jmilla.comparking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserReviewConverter {

    private final UserRepository userRepository;
    private final AparcamientoRepository aparcamientoRepository;
    private final ModelMapper modelMapper;

    public UserReview toEntity(UserReviewDTO dto) {
        User reviewer = userRepository.findById(dto.reviewerId())
                .orElseThrow(() -> new RuntimeException("Reviewer no encontrado"));
        User reviewed = userRepository.findById(dto.reviewedId())
                .orElseThrow(() -> new RuntimeException("Reviewed no encontrado"));
        Aparcamiento aparcamiento = aparcamientoRepository.findById(dto.aparcamientoId())
                .orElseThrow(() -> new RuntimeException("Aparcamiento no encontrado"));

        UserReview review = new UserReview();
        review.setReviewer(reviewer);
        review.setReviewed(reviewed);
        review.setAparcamiento(aparcamiento);
        review.setPuntuacion(dto.puntuacion());
        review.setComentario(dto.comentario());
        review.setFecha(dto.fecha());

        return review;
    }

    public UserReviewDTOResponse toDtoResponse(UserReview review) {
        return new UserReviewDTOResponse(
                review.getIdUserReview(),
                review.getReviewer().getUsername(),
                review.getReviewed().getUsername(),
                review.getAparcamiento().getDireccion(),
                review.getPuntuacion(),
                review.getComentario(),
                review.getFecha()
        );
    }

    public UserReview toEntityMapper(UserReviewDTO dto) {
        return modelMapper.map(dto, UserReview.class);
    }

    public UserReviewDTO toDtoMapper(UserReview review) {
        return modelMapper.map(review, UserReviewDTO.class);
    }
}

