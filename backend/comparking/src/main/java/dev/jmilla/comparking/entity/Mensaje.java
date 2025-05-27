package dev.jmilla.comparking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Mensaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMensaje;

    @ManyToOne
    @JoinColumn(name = "emisor_id", nullable = false)
    @JsonBackReference
    private User emisor;

    @ManyToOne
    @JoinColumn(name = "receptor_id", nullable = false)
    @JsonBackReference
    private User receptor;

    @NotBlank
    @Size(max = 1000)
    private String contenido;

    @Column(nullable = false)
    private LocalDateTime fechaEnvio;
}
