package dev.jmilla.comparking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Aparcamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAparcamiento;

    @NotBlank
    @Size(max = 300)
    private String direccion;

    @NotBlank
    @Size(max = 45)
    private String localidad;

    @NotBlank
    @Size(max = 45)
    private String provincia;

    @Positive
    private Float ancho;

    @Positive
    private Float largo;

    @Size(max = 300)
    private String detalles;

    @Size(max = 300)
    private String imagen;

    @Size(max = 300)
    private String video;

    private Boolean techado;

    @Positive
    private Float precioHora;

    @Positive
    private Float precioDia;

    @DecimalMax(value = "180.0")
    @DecimalMin(value = "-180.0")
    private Double longitud;

    @DecimalMax(value = "90.0")
    @DecimalMin(value = "-90.0")
    private Double latitud;

    @Positive
    private Float precioMs;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "aparcamiento")
    @JsonManagedReference
    private List<Reserva> reservas;

    @OneToMany(mappedBy = "aparcamiento")
    @JsonManagedReference
    private List<Denuncia> denuncias;

    @OneToMany(mappedBy = "parkSolicitado")
    @JsonManagedReference
    private List<Trueque> truequesSolicitados;

    @OneToMany(mappedBy = "parkOfrecido")
    @JsonManagedReference
    private List<Trueque> truequesOfrecidos;
}
