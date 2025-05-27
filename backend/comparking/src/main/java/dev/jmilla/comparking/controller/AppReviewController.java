package dev.jmilla.comparking.controller;

import dev.jmilla.comparking.dto.AppReviewDTO;
import dev.jmilla.comparking.dto.AppReviewDTOResponse;
import dev.jmilla.comparking.service.AppReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/app-reviews")
@RequiredArgsConstructor
public class AppReviewController {

    private final AppReviewService service;

    @Operation(summary = "Crear una nueva reseña de la app")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Reseña creada correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos")
    })
    @PostMapping
    public ResponseEntity<AppReviewDTOResponse> create(@RequestBody @Valid AppReviewDTO dto) {
        return ResponseEntity.status(201).body(service.save(dto));
    }

    @Operation(summary = "Eliminar una reseña por ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Reseña eliminada correctamente"),
            @ApiResponse(responseCode = "404", description = "Reseña no encontrada")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Listar todas las reseñas de la app")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Reseñas obtenidas con éxito"),
            @ApiResponse(responseCode = "204", description = "No hay reseñas disponibles")
    })
    @GetMapping
    public ResponseEntity<List<AppReviewDTOResponse>> findAll() {
        List<AppReviewDTOResponse> reviews = service.findAll();
        return reviews.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(reviews);
    }

    @Operation(summary = "Listar reseñas realizadas por un usuario")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Reseñas obtenidas con éxito"),
            @ApiResponse(responseCode = "204", description = "El usuario no ha realizado reseñas")
    })
    @GetMapping("/usuario/{idUser}")
    public ResponseEntity<List<AppReviewDTOResponse>> findByUser(@PathVariable Long idUser) {
        List<AppReviewDTOResponse> reviews = service.findByUsuarioId(idUser);
        return reviews.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(reviews);
    }
}
