package dev.jmilla.comparking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReserva;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User usuario;

    @ManyToOne
    @JoinColumn(name = "aparcamiento_id", nullable = false)
    @JsonBackReference
    private Aparcamiento aparcamiento;

    @NotNull
    private LocalDateTime fechaInicio;

    @NotNull
    private LocalDateTime fechaFin;

    @NotBlank
    @Size(max = 50)
    private String estado; // pendiente, aceptada, rechazada, finalizada

    @NotBlank
    @Size(max = 45)
    private String tipoPago; // horario, diario

    @PositiveOrZero
    private Float precioTotal;

    private Boolean pagoConfirmado;

    private LocalDateTime fechaPago;

    @Size(max = 45)
    private String tipoPagoMs;

    @OneToMany(mappedBy = "reserva")
    @JsonManagedReference
    private List<Trueque> trueques;
}
