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
public class Denuncia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDenuncia;

    @ManyToOne
    @JoinColumn(name = "denunciante_id", nullable = false)
    @JsonBackReference
    private User denunciante;

    @ManyToOne
    @JoinColumn(name = "denunciado_id", nullable = false)
    @JsonBackReference
    private User denunciado;

    @ManyToOne
    @JoinColumn(name = "aparcamiento_id", nullable = false)
    @JsonBackReference
    private Aparcamiento aparcamiento;

    @NotBlank
    @Size(max = 500)
    private String descripcion;

    @Size(max = 300)
    private String imagen;

    @NotNull
    private LocalDateTime fecha;

    @NotBlank
    @Size(max = 45)
    private String estado; // pendiente, revisada, resuelta
}
