package dev.jmilla.comparking.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;

    @Column(nullable = false, unique = true)
    @Email
    @NotBlank(message = "El correo no puede estar vacío")
    private String username;

    @Column(nullable = false)
    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 4, message = "La contraseña debe tener al menos 4 caracteres")
    private String password;

    @Column(nullable = false)
    private String role = "ROLE_USER";

    @Size(min = 2, max = 30)
    private String nombre = "Nombre";

    @Size(min = 2, max = 100)
    private String apellidos = "Apellidos";

    @Pattern(regexp = "^[0-9]{8}[A-Za-z]$", message = "El DNI debe tener 8 números y una letra")
    private String dni = "00000000A";

    private String foto;

    private String iban = "ES00 0000 0000 00 0000000000";

    private Float saldo = 0f;

    private Float depositos = 50f;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Aparcamiento> aparcamientos;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<AppReview> appReviews;

    @OneToMany(mappedBy = "reviewer")
    @JsonManagedReference
    private List<UserReview> userReviewsHechas;

    @OneToMany(mappedBy = "reviewed")
    @JsonManagedReference
    private List<UserReview> userReviewsRecibidas;

    @OneToMany(mappedBy = "emisor")
    @JsonManagedReference
    private List<Mensaje> mensajesEnviados;

    @OneToMany(mappedBy = "receptor")
    @JsonManagedReference
    private List<Mensaje> mensajesRecibidos;

    @OneToMany(mappedBy = "denunciante")
    @JsonManagedReference
    private List<Denuncia> denunciasRealizadas;

    @OneToMany(mappedBy = "denunciado")
    @JsonManagedReference
    private List<Denuncia> denunciasRecibidas;

    @OneToMany(mappedBy = "usuario")
    @JsonManagedReference
    private List<Reserva> reservas;

    @OneToMany(mappedBy = "usuario")
    @JsonManagedReference
    private List<Trueque> trueques;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> role);
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
