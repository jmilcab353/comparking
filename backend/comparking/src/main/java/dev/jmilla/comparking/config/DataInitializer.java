package dev.jmilla.comparking.config;

import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initUsers() {
        createUserIfNotExists("user@example.com", "userpass", "ROLE_USER");
        createUserIfNotExists("mod@example.com", "modpass", "ROLE_MOD");
        createUserIfNotExists("admin@example.com", "adminpass", "ROLE_ADMIN");
    }

    private void createUserIfNotExists(String email, String rawPassword, String role) {
        if (userRepository.findByUsername(email).isEmpty()) {
            User user = new User();
            user.setUsername(email);
            user.setPassword(passwordEncoder.encode(rawPassword));
            user.setNombre("Nombre " + role);
            user.setApellidos("Apellido " + role);
            user.setDni("00000000" + role.charAt(role.length() - 1));
            user.setRole(role);
            user.setSaldo(100.0f);
            user.setDepositos(50.0f);
            userRepository.save(user);
        }
    }

}
