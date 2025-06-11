package dev.jmilla.comparking.service.impl;

import dev.jmilla.comparking.dto.*;
import dev.jmilla.comparking.dto.converter.UserConverter;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.repository.UserRepository;
import dev.jmilla.comparking.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final UserConverter converter;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserDTOResponse> findAll() {
        return repository.findAll().stream()
                .map(converter::toDtoResponse)
                .toList();
    }

    @Override
    public Optional<UserDTOResponse> findById(Long id) {
        return repository.findById(id)
                .map(converter::toDtoResponse);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    public User save(UserDTO dto) {
        User user = converter.toEntity(dto);
        return repository.save(user);
    }

    @Override
    public User save(UserRegisterDTO dto) {
        User user = new User();
        user.setUsername(dto.username());
        user.setPassword(passwordEncoder.encode(dto.password())); // encripta contraseña si tienes un PasswordEncoder
        user.setRole("ROLE_USER");
        return repository.save(user);
    }

    @Override
    public User update(Long id, UserDTO dto) {
        return repository.findById(id).map(existing -> {
            User updated = converter.toEntity(dto);
            updated.setIdUser(id);
            return repository.save(updated);
        }).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Override
    public void deleteById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Usuario no encontrado");
        }
    }

    @Override
    public Optional<UserDTOResponse> findDTOById(Long id) {
        return repository.findById(id)
                .map(user -> new UserDTOResponse(
                        user.getIdUser(),
                        user.getUsername(),
                        user.getNombre(),
                        user.getApellidos(),
                        user.getDni(),
                        user.getFoto(),
                        user.getSaldo(),
                        user.getDepositos(),
                        user.getRole()
                ));
    }

    @Override
    public Optional<UserDataDTO> getUserDataByUsername(String username) {
        return repository.findByUsername(username)
                .map(user -> new UserDataDTO(
                        user.getIdUser(),
                        user.getUsername(),
                        user.getNombre(),
                        user.getApellidos(),
                        user.getDni(),
                        user.getFoto(),
                        user.getIban(),
                        user.getSaldo(),
                        user.getDepositos(), // <- este es el nombre correcto
                        user.getRole()
                ));
    }

    @Override
    public Optional<UserDataDTO> updateUserData(Long id, String usernameAuth, UserDataUpdateDTO dto) {
        return repository.findById(id)
                .filter(user -> user.getUsername().equals(usernameAuth))
                .map(user -> {
                    user.setNombre(dto.nombre());
                    user.setApellidos(dto.apellidos());
                    user.setDni(dto.dni());
                    user.setFoto(dto.foto());
                    user.setIban(dto.iban());
                    user.setUsername(dto.username());
                    user.setSaldo(dto.saldo()); // saldo se puede actualizar desde front

                    User updated = repository.save(user);
                    return new UserDataDTO(
                            updated.getIdUser(),
                            updated.getUsername(),
                            updated.getNombre(),
                            updated.getApellidos(),
                            updated.getDni(),
                            updated.getFoto(),
                            updated.getIban(),
                            updated.getSaldo(),
                            updated.getDepositos(),
                            updated.getRole()
                    );
                });
    }

    @Override
    public Optional<UserDTOResponse> updatePassword(Long id, String nuevaPassword) {
        return repository.findById(id).map(user -> {
            user.setPassword(passwordEncoder.encode(nuevaPassword));
            return converter.toDtoResponse(repository.save(user));
        });
    }

    @Override
    public String guardarFotoPerfil(Long id, String usernameAuth, MultipartFile file) throws IOException {
        User user = repository.findById(id)
                .filter(u -> u.getUsername().equals(usernameAuth))
                .orElseThrow(() -> new SecurityException("No autorizado"));

        String nombreArchivo = UUID.randomUUID() + "-" + file.getOriginalFilename();
        Path rutaDestino = Paths.get("uploads/fotos").resolve(nombreArchivo);

        Files.createDirectories(rutaDestino.getParent());
        Files.copy(file.getInputStream(), rutaDestino, StandardCopyOption.REPLACE_EXISTING);

        user.setFoto("/uploads/fotos/" + nombreArchivo); // Ruta para mostrarla
        repository.save(user);

        return user.getFoto();
    }

}
