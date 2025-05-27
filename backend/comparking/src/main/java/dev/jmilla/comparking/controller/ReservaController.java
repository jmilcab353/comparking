package dev.jmilla.comparking.controller;

import dev.jmilla.comparking.dto.ReservaDTO;
import dev.jmilla.comparking.dto.ReservaDTOResponse;
import dev.jmilla.comparking.service.ReservaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@RequiredArgsConstructor
public class ReservaController {

    private final ReservaService reservaService;

    @Operation(summary = "Obtener todas las reservas")
    @ApiResponse(responseCode = "200", description = "Reservas obtenidas correctamente")
    @ApiResponse(responseCode = "204", description = "No hay reservas disponibles")
    @GetMapping
    public ResponseEntity<List<ReservaDTOResponse>> findAll() {
        List<ReservaDTOResponse> reservas = reservaService.findAll();
        return reservas.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(reservas);
    }

    @Operation(summary = "Obtener una reserva por ID")
    @ApiResponse(responseCode = "200", description = "Reserva encontrada")
    @ApiResponse(responseCode = "404", description = "Reserva no encontrada")
    @GetMapping("/{id}")
    public ResponseEntity<ReservaDTOResponse> findById(@PathVariable Long id) {
        return reservaService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Crear una nueva reserva")
    @ApiResponse(responseCode = "201", description = "Reserva creada correctamente")
    @ApiResponse(responseCode = "400", description = "Datos inválidos")
    @PostMapping
    public ResponseEntity<ReservaDTOResponse> create(@RequestBody @Valid ReservaDTO dto) {
        return ResponseEntity.status(201).body(reservaService.save(dto));
    }

    @Operation(summary = "Actualizar una reserva existente")
    @ApiResponse(responseCode = "200", description = "Reserva actualizada correctamente")
    @ApiResponse(responseCode = "404", description = "Reserva no encontrada")
    @PutMapping("/{id}")
    public ResponseEntity<ReservaDTOResponse> update(@PathVariable Long id, @RequestBody @Valid ReservaDTO dto) {
        return ResponseEntity.ok(reservaService.update(id, dto));
    }

    @Operation(summary = "Eliminar una reserva por ID")
    @ApiResponse(responseCode = "204", description = "Reserva eliminada correctamente")
    @ApiResponse(responseCode = "404", description = "Reserva no encontrada")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reservaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
