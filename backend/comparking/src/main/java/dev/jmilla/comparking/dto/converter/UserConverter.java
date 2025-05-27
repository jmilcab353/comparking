package dev.jmilla.comparking.dto.converter;

import dev.jmilla.comparking.dto.UserDTO;
import dev.jmilla.comparking.dto.UserDTOResponse;
import dev.jmilla.comparking.entity.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserConverter {

    private final ModelMapper modelMapper;

    public User toEntity(UserDTO dto) {
        User user = new User();
        user.setUsername(dto.username());
        user.setPassword(dto.password());
        user.setNombre(dto.nombre());
        user.setApellidos(dto.apellidos());
        user.setDni(dto.dni());
        user.setFoto(dto.foto());
        user.setSaldo(dto.saldo());
        user.setDepositos(dto.depositos());
        user.setRole(dto.role());
        return user;
    }

    public UserDTOResponse toDtoResponse(User user) {
        return new UserDTOResponse(
                user.getIdUser(),
                user.getUsername(),
                user.getNombre(),
                user.getApellidos(),
                user.getDni(),
                user.getFoto(),
                user.getSaldo(),
                user.getDepositos(),
                user.getRole()
        );
    }

    public UserDTO toDtoMapper(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    public User toEntityMapper(UserDTO dto) {
        return modelMapper.map(dto, User.class);
    }
}
