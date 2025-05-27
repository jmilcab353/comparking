package dev.jmilla.comparking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class UserReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUserReview;

    @ManyToOne
    @JoinColumn(name = "reviewer_id", nullable = false)
    @JsonBackReference
    private User reviewer;

    @ManyToOne
    @JoinColumn(name = "reviewed_id", nullable = false)
    @JsonBackReference
    private User reviewed;

    @ManyToOne
    @JoinColumn(name = "aparcamiento_id", nullable = false)
    @JsonBackReference
    private Aparcamiento aparcamiento;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer puntuacion;

    @Size(max = 300)
    private String comentario;

    @NotNull
    private LocalDateTime fecha;
}
