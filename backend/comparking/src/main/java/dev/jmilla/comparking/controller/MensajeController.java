package dev.jmilla.comparking.controller;

import dev.jmilla.comparking.dto.MensajeDTO;
import dev.jmilla.comparking.dto.MensajeDTOResponse;
import dev.jmilla.comparking.service.MensajeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mensajes")
@RequiredArgsConstructor
public class MensajeController {

    private final MensajeService service;

    @Operation(summary = "Obtener todos los mensajes")
    @ApiResponse(responseCode = "200", description = "Mensajes recuperados con éxito")
    @ApiResponse(responseCode = "204", description = "No hay mensajes disponibles")
    @GetMapping
    public ResponseEntity<List<MensajeDTOResponse>> findAll() {
        List<MensajeDTOResponse> mensajes = service.findAll();
        return mensajes.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(mensajes);
    }

    @Operation(summary = "Obtener un mensaje por su ID")
    @ApiResponse(responseCode = "200", description = "Mensaje encontrado")
    @ApiResponse(responseCode = "404", description = "Mensaje no encontrado")
    @GetMapping("/{id}")
    public ResponseEntity<MensajeDTOResponse> findById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Enviar un nuevo mensaje")
    @ApiResponse(responseCode = "201", description = "Mensaje enviado correctamente")
    @ApiResponse(responseCode = "400", description = "Datos inválidos")
    @PostMapping
    public ResponseEntity<MensajeDTOResponse> create(@RequestBody @Valid MensajeDTO dto) {
        return ResponseEntity.status(201).body(service.save(dto));
    }

    @Operation(summary = "Eliminar un mensaje por su ID")
    @ApiResponse(responseCode = "204", description = "Mensaje eliminado correctamente")
    @ApiResponse(responseCode = "404", description = "Mensaje no encontrado")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Buscar mensajes enviados por un usuario")
    @ApiResponse(responseCode = "200", description = "Mensajes enviados obtenidos")
    @ApiResponse(responseCode = "204", description = "No se encontraron mensajes")
    @GetMapping("/emisor/{id}")
    public ResponseEntity<List<MensajeDTOResponse>> findByEmisor(@PathVariable Long id) {
        List<MensajeDTOResponse> mensajes = service.findByEmisor(id);
        return mensajes.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(mensajes);
    }

    @Operation(summary = "Buscar mensajes recibidos por un usuario")
    @ApiResponse(responseCode = "200", description = "Mensajes recibidos obtenidos")
    @ApiResponse(responseCode = "204", description = "No se encontraron mensajes")
    @GetMapping("/receptor/{id}")
    public ResponseEntity<List<MensajeDTOResponse>> findByReceptor(@PathVariable Long id) {
        List<MensajeDTOResponse> mensajes = service.findByReceptor(id);
        return mensajes.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(mensajes);
    }
}
