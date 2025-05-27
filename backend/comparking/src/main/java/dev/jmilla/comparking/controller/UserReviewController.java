package dev.jmilla.comparking.controller;

import dev.jmilla.comparking.dto.UserReviewDTO;
import dev.jmilla.comparking.dto.UserReviewDTOResponse;
import dev.jmilla.comparking.service.UserReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-reviews")
@RequiredArgsConstructor
public class UserReviewController {

    private final UserReviewService service;

    @Operation(summary = "Crear una nueva reseña de usuario")
    @ApiResponse(responseCode = "201", description = "Reseña creada correctamente")
    @ApiResponse(responseCode = "400", description = "Datos inválidos")
    @PostMapping
    public ResponseEntity<UserReviewDTOResponse> create(@RequestBody @Valid UserReviewDTO dto) {
        return ResponseEntity.status(201).body(service.save(dto));
    }

    @Operation(summary = "Eliminar una reseña por su ID")
    @ApiResponse(responseCode = "204", description = "Reseña eliminada correctamente")
    @ApiResponse(responseCode = "404", description = "Reseña no encontrada")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Listar reseñas realizadas por un usuario")
    @ApiResponse(responseCode = "200", description = "Reseñas realizadas obtenidas con éxito")
    @ApiResponse(responseCode = "204", description = "El usuario no ha realizado reseñas")
    @GetMapping("/reviewer/{id}")
    public ResponseEntity<List<UserReviewDTOResponse>> findByReviewer(@PathVariable Long id) {
        List<UserReviewDTOResponse> reviews = service.findByReviewerId(id);
        return reviews.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(reviews);
    }

    @Operation(summary = "Listar reseñas recibidas por un usuario")
    @ApiResponse(responseCode = "200", description = "Reseñas recibidas obtenidas con éxito")
    @ApiResponse(responseCode = "204", description = "El usuario no ha recibido reseñas")
    @GetMapping("/reviewed/{id}")
    public ResponseEntity<List<UserReviewDTOResponse>> findByReviewed(@PathVariable Long id) {
        List<UserReviewDTOResponse> reviews = service.findByReviewedId(id);
        return reviews.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(reviews);
    }
}
