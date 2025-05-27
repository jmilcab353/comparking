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
public class AppReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAppReview;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer puntuacion;

    @Size(max = 300)
    private String comentario;

    @NotNull
    private LocalDateTime fecha;
}
