package dev.jmilla.comparking.service.impl;

import dev.jmilla.comparking.dto.UserDTO;
import dev.jmilla.comparking.dto.UserDTOResponse;
import dev.jmilla.comparking.dto.UserDataDTO;
import dev.jmilla.comparking.dto.UserRegisterDTO;
import dev.jmilla.comparking.dto.converter.UserConverter;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.repository.UserRepository;
import dev.jmilla.comparking.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

}
