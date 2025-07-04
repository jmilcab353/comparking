package dev.jmilla.comparking.controller;

import dev.jmilla.comparking.dto.AparcamientoDTO;
import dev.jmilla.comparking.dto.AparcamientoDTOResponse;
import dev.jmilla.comparking.service.AparcamientoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.List;

@RestController
@RequestMapping("/api/aparcamientos")
@RequiredArgsConstructor
public class AparcamientoController {

    private final AparcamientoService service;

    @Operation(summary = "Listar todos los aparcamientos")
    @ApiResponse(responseCode = "200", description = "Listado de aparcamientos obtenido con éxito")
    @ApiResponse(responseCode = "204", description = "No hay aparcamientos disponibles")
    @GetMapping
    public ResponseEntity<List<AparcamientoDTOResponse>> findAll() {
        List<AparcamientoDTOResponse> lista = service.findAll();
        return lista.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(lista);
    }

    @Operation(summary = "Obtener un aparcamiento por ID")
    @ApiResponse(responseCode = "200", description = "Aparcamiento encontrado")
    @ApiResponse(responseCode = "404", description = "Aparcamiento no encontrado")
    @GetMapping("/{id}")
    public ResponseEntity<AparcamientoDTOResponse> findById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Crear un nuevo aparcamiento")
    @ApiResponse(responseCode = "201", description = "Aparcamiento creado correctamente")
    @ApiResponse(responseCode = "400", description = "Datos inválidos")
    @PostMapping
    public ResponseEntity<AparcamientoDTOResponse> create(@RequestBody @Valid AparcamientoDTO dto) {
        return ResponseEntity.status(201).body(service.save(dto));
    }

    @Operation(summary = "Actualizar un aparcamiento existente")
    @ApiResponse(responseCode = "200", description = "Aparcamiento actualizado correctamente")
    @ApiResponse(responseCode = "404", description = "Aparcamiento no encontrado")
    @PutMapping("/{id}")
    public ResponseEntity<AparcamientoDTOResponse> update(@PathVariable Long id, @RequestBody @Valid AparcamientoDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @Operation(summary = "Eliminar un aparcamiento por ID")
    @ApiResponse(responseCode = "204", description = "Aparcamiento eliminado correctamente")
    @ApiResponse(responseCode = "404", description = "Aparcamiento no encontrado")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Listar aparcamientos de un usuario")
    @ApiResponse(responseCode = "200", description = "Aparcamientos del usuario obtenidos con éxito")
    @ApiResponse(responseCode = "204", description = "El usuario no tiene aparcamientos")
    @GetMapping("/usuario/{idUser}")
    public ResponseEntity<List<AparcamientoDTOResponse>> findByUser(@PathVariable Long idUser) {
        List<AparcamientoDTOResponse> lista = service.findAllByUserId(idUser);
        return lista.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(lista);
    }

    @PostMapping("/upload")
    @Operation(summary = "Subir imagen de aparcamiento")
    public ResponseEntity<String> uploadFotoAparcamiento(@RequestParam("file") MultipartFile file) {
        try {
            String url = service.guardarImagenAparcamiento(file);
            return ResponseEntity.ok(url);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error al guardar la imagen");
        }
    }

    @GetMapping("/{id}/imagen")
    public ResponseEntity<byte[]> obtenerImagenAparcamiento(@PathVariable Long id) {
        try {
            AparcamientoDTOResponse aparcamiento = service.findById(id)
                    .orElseThrow(() -> new RuntimeException("Aparcamiento no encontrado"));

            String relativePath = aparcamiento.imagen();

            if (relativePath == null || relativePath.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            // Elimina la primera barra si existe
            if (relativePath.startsWith("/")) {
                relativePath = relativePath.substring(1);
            }

            Path imagenPath = Paths.get(relativePath);
            Resource imagenResource = new UrlResource(imagenPath.toUri());

            if (!imagenResource.exists()) {
                return ResponseEntity.notFound().build();
            }

            byte[] imagenBytes = Files.readAllBytes(imagenPath);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imagenBytes);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
