package dev.jmilla.comparking.service;

import dev.jmilla.comparking.dto.*;
import dev.jmilla.comparking.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    Optional<UserDataDTO> updateUserData(Long id, String usernameAuth, UserDataUpdateDTO dto);

    Optional<UserDTOResponse> updatePassword(Long id, String nuevaPassword);

    String guardarFotoPerfil(Long id, String usernameAuth, MultipartFile file) throws IOException;


}
