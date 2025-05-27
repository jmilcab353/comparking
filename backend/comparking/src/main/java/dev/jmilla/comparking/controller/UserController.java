package dev.jmilla.comparking.controller;

import dev.jmilla.comparking.dto.UserDTOResponse;
import dev.jmilla.comparking.dto.UserDataDTO;
import dev.jmilla.comparking.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "Obtener todos los usuarios", description = "Recupera una lista de todos los usuarios registrados")
    @ApiResponse(responseCode = "200", description = "Usuarios encontrados")
    @ApiResponse(responseCode = "404", description = "No se encontraron usuarios")
    @GetMapping
    public ResponseEntity<List<UserDTOResponse>> findAll() {
        List<UserDTOResponse> usuarios = userService.findAll();
        return usuarios.isEmpty()
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(usuarios);
    }

    @Operation(summary = "Obtener usuario por ID", description = "Obtiene los datos de un usuario específico")
    @ApiResponse(responseCode = "200", description = "Usuario encontrado")
    @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    @GetMapping("/{id}")
    public ResponseEntity<UserDTOResponse> findById(@PathVariable Long id) {
        return userService.findDTOById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Obtener mis datos", description = "Devuelve los datos del usuario actualmente autenticado")
    @ApiResponse(responseCode = "200", description = "Datos del usuario autenticado")
    @GetMapping("/me")
    public ResponseEntity<UserDataDTO> getMe(@AuthenticationPrincipal(expression = "username") String username) {
        return userService.getUserDataByUsername(username)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
