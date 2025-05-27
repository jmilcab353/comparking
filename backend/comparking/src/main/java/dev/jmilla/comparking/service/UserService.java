package dev.jmilla.comparking.service;

import dev.jmilla.comparking.dto.UserDTO;
import dev.jmilla.comparking.dto.UserDTOResponse;
import dev.jmilla.comparking.dto.UserDataDTO;
import dev.jmilla.comparking.dto.UserRegisterDTO;
import dev.jmilla.comparking.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<UserDTOResponse> findAll();

    Optional<UserDTOResponse> findById(Long id);

    Optional<User> findByUsername(String username);

    User save(UserDTO dto);

    User save(UserRegisterDTO dto);

    User update(Long id, UserDTO dto);

    void deleteById(Long id);

    Optional<UserDTOResponse> findDTOById(Long id);

    Optional<UserDataDTO> getUserDataByUsername(String username);

}
