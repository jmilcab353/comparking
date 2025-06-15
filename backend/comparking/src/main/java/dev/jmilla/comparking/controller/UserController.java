package dev.jmilla.comparking.controller;

import dev.jmilla.comparking.dto.UserDTO;
import dev.jmilla.comparking.dto.UserDTOResponse;
import dev.jmilla.comparking.dto.UserDataDTO;
import dev.jmilla.comparking.dto.UserDataUpdateDTO;
import dev.jmilla.comparking.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar mis datos", description = "Actualiza los datos del usuario autenticado")
    @ApiResponse(responseCode = "200", description = "Datos actualizados correctamente")
    public ResponseEntity<UserDataDTO> updateUser(
            @PathVariable Long id,
            @RequestBody UserDataUpdateDTO updateDTO,
            @AuthenticationPrincipal(expression = "username") String username
    ) {
        return userService.updateUserData(id, username, updateDTO)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/admin/{id}")
    @Operation(summary = "Editar usuario como admin", description = "Permite a un ADMIN editar cualquier usuario")
    @ApiResponse(responseCode = "200", description = "Usuario editado correctamente")
    @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    public ResponseEntity<UserDTO> updateUserAsAdmin(@PathVariable Long id, @RequestBody UserDTO dto) {
        try {
            userService.update(id, dto);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/password")
    @Operation(summary = "Actualizar contraseña", description = "Actualiza la contraseña de un usuario por su ID")
    public ResponseEntity<UserDTOResponse> updatePassword(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        String nuevaPassword = body.get("nuevaPassword");

        if (nuevaPassword == null || nuevaPassword.length() < 4) {
            return ResponseEntity.badRequest().build();
        }

        return userService.updatePassword(id, nuevaPassword)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/foto")
    @Operation(summary = "Subir foto de perfil", description = "Permite subir una imagen para el perfil del usuario")
    public ResponseEntity<String> uploadFotoPerfil(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal(expression = "username") String usernameAuth
    ) {
        try {
            String url = userService.guardarFotoPerfil(id, usernameAuth, file);
            return ResponseEntity.ok(url);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar la imagen");
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No autorizado");
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar usuario", description = "Elimina un usuario por su ID")
    @ApiResponse(responseCode = "204", description = "Usuario eliminado correctamente")
    @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        try {
            userService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
