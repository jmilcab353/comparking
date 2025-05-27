package dev.jmilla.comparking.controller;

import dev.jmilla.comparking.dto.TruequeDTO;
import dev.jmilla.comparking.dto.TruequeDTOResponse;
import dev.jmilla.comparking.service.TruequeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trueques")
@RequiredArgsConstructor
public class TruequeController {

    private final TruequeService service;

    @Operation(summary = "Listar todos los trueques")
    @ApiResponse(responseCode = "200", description = "Lista de trueques obtenida con éxito")
    @ApiResponse(responseCode = "204", description = "No hay trueques disponibles")
    @GetMapping
    public ResponseEntity<List<TruequeDTOResponse>> findAll() {
        List<TruequeDTOResponse> lista = service.findAll();
        return lista.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(lista);
    }

    @Operation(summary = "Obtener un trueque por ID")
    @ApiResponse(responseCode = "200", description = "Trueque encontrado")
    @ApiResponse(responseCode = "404", description = "Trueque no encontrado")
    @GetMapping("/{id}")
    public ResponseEntity<TruequeDTOResponse> findById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Crear un nuevo trueque")
    @ApiResponse(responseCode = "201", description = "Trueque creado correctamente")
    @ApiResponse(responseCode = "400", description = "Datos inválidos")
    @PostMapping
    public ResponseEntity<TruequeDTOResponse> create(@RequestBody @Valid TruequeDTO dto) {
        return ResponseEntity.status(201).body(service.save(dto));
    }

    @Operation(summary = "Actualizar un trueque existente")
    @ApiResponse(responseCode = "200", description = "Trueque actualizado correctamente")
    @ApiResponse(responseCode = "404", description = "Trueque no encontrado")
    @PutMapping("/{id}")
    public ResponseEntity<TruequeDTOResponse> update(@PathVariable Long id, @RequestBody @Valid TruequeDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @Operation(summary = "Eliminar un trueque por ID")
    @ApiResponse(responseCode = "204", description = "Trueque eliminado correctamente")
    @ApiResponse(responseCode = "404", description = "Trueque no encontrado")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
