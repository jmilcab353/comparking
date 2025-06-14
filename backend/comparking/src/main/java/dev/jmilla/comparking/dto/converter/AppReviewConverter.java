package dev.jmilla.comparking.dto.converter;

import dev.jmilla.comparking.dto.AppReviewDTO;
import dev.jmilla.comparking.dto.AppReviewDTOResponse;
import dev.jmilla.comparking.entity.AppReview;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AppReviewConverter {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public AppReview toEntity(AppReviewDTO dto) {
        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        AppReview review = new AppReview();
        review.setUser(user);
        review.setPuntuacion(dto.puntuacion());
        review.setComentario(dto.comentario());
        review.setFecha(dto.fecha());

        return review;
    }

    public AppReviewDTOResponse toDtoResponse(AppReview review) {
        return new AppReviewDTOResponse(
                review.getIdAppReview(),
                review.getUser().getUsername(),
                review.getPuntuacion(),
                review.getComentario(),
                review.getFecha(),
                review.getUser().getIdUser()
        );
    }

    public AppReview toEntityMapper(AppReviewDTO dto) {
        return modelMapper.map(dto, AppReview.class);
    }

    public AppReviewDTO toDtoMapper(AppReview review) {
        return modelMapper.map(review, AppReviewDTO.class);
    }
}

