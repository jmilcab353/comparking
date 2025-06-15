package dev.jmilla.comparking.controller;

import dev.jmilla.comparking.dto.DenunciaDTO;
import dev.jmilla.comparking.dto.DenunciaDTOResponse;
import dev.jmilla.comparking.service.DenunciaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/denuncias")
@RequiredArgsConstructor
public class DenunciaController {

    private final DenunciaService service;

    @Operation(summary = "Crear una nueva denuncia")
    @ApiResponse(responseCode = "201", description = "Denuncia creada correctamente")
    @ApiResponse(responseCode = "400", description = "Datos inválidos")
    @PostMapping
    public ResponseEntity<DenunciaDTOResponse> create(@RequestBody @Valid DenunciaDTO dto) {
        return ResponseEntity.status(201).body(service.save(dto));
    }

    @Operation(summary = "Obtener una denuncia por ID")
    @ApiResponse(responseCode = "200", description = "Denuncia encontrada")
    @ApiResponse(responseCode = "404", description = "Denuncia no encontrada")
    @GetMapping("/{id}")
    public ResponseEntity<DenunciaDTOResponse> findById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Eliminar una denuncia por ID")
    @ApiResponse(responseCode = "204", description = "Denuncia eliminada correctamente")
    @ApiResponse(responseCode = "404", description = "Denuncia no encontrada")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Listar todas las denuncias")
    @ApiResponse(responseCode = "200", description = "Listado de denuncias obtenido con éxito")
    @ApiResponse(responseCode = "204", description = "No hay denuncias registradas")
    @GetMapping
    public ResponseEntity<List<DenunciaDTOResponse>> findAll() {
        List<DenunciaDTOResponse> lista = service.findAll();
        return lista.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(lista);
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<DenunciaDTOResponse> updateEstado(@PathVariable Long id, @RequestParam String valor) {
        return ResponseEntity.ok(service.updateEstado(id, valor));
    }

}
