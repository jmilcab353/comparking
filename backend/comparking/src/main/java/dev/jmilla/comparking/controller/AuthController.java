package dev.jmilla.comparking.controller;

import dev.jmilla.comparking.dto.LoginRequest;
import dev.jmilla.comparking.dto.LoginResponse;
import dev.jmilla.comparking.dto.UserRegisterDTO;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.security.JwtTokenProvider;
import dev.jmilla.comparking.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Operation(summary = "Registro de usuario", description = "Registra un nuevo usuario con sus credenciales")
    @ApiResponse(responseCode = "201", description = "Usuario creado correctamente")
    @ApiResponse(responseCode = "400", description = "Datos inválidos")
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserRegisterDTO userDTO) {
        User savedUser = userService.save(userDTO);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @Operation(summary = "Login", description = "Autentica al usuario y devuelve un token JWT")
    @ApiResponse(responseCode = "200", description = "Login correcto")
    @ApiResponse(responseCode = "401", description = "Credenciales inválidas")
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginDTO) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.username(), loginDTO.password())
        );

        User user = (User) auth.getPrincipal();
        String token = jwtTokenProvider.generateToken(auth);
        String role = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("ROLE_USER");

        return new LoginResponse(role, token, user.getUsername());
    }
}
