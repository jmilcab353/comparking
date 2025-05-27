package dev.jmilla.comparking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Trueque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTrueque;

    @ManyToOne
    @JoinColumn(name = "park_solicitado_id", nullable = false)
    @JsonBackReference
    private Aparcamiento parkSolicitado;

    @ManyToOne
    @JoinColumn(name = "park_ofrecido_id", nullable = false)
    @JsonBackReference
    private Aparcamiento parkOfrecido;

    @ManyToOne
    @JoinColumn(name = "reserva_id", nullable = false)
    @JsonBackReference
    private Reserva reserva;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User usuario;

    @NotBlank
    @Size(max = 45)
    private String estado; // pendiente, aceptado, rechazado, finalizado

    @NotNull
    private LocalDateTime fechaInicio;

    @NotNull
    private LocalDateTime fechaFin;
}
