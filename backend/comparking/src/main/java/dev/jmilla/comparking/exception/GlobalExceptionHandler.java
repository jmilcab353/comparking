package dev.jmilla.comparking.exception;

import dev.jmilla.comparking.exception.custom.AparcamientoNotFoundException;
import dev.jmilla.comparking.exception.custom.UserNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse(ConstantErrors.AUTH_CREDENCIALES_INCORRECTAS_ERROR,
                        ConstantErrors.AUTH_CREDENCIALES_INCORRECTAS_DESCRIPCION));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse(ConstantErrors.AUTH_GENERAL_ERROR,
                        ConstantErrors.AUTH_GENERAL_DESCRIPCION));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, Object> body = new HashMap<>();
        Map<String, String> fieldErrors = new HashMap<>();

        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(error.getField(), error.getDefaultMessage());
        }

        body.put("error", "Error de validación");
        body.put("message", "Uno o más campos no son válidos");
        body.put("timestamp", LocalDateTime.now());
        body.put("fields", fieldErrors);

        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityException(DataIntegrityViolationException ex) {
        String message = ex.getMostSpecificCause().getMessage();
        String fieldName = "El valor ingresado";
        String errorMessage;

        if (message.contains("Duplicate entry")) {
            if (message.contains("for key 'user.UK")) {
                fieldName = "El correo electrónico";
            }
            errorMessage = fieldName + " ya está registrado. Intenta con otro.";
        } else {
            errorMessage = ConstantErrors.DATA_INTEGRITY_MESSAGE + ex.getMessage();
        }

        return ResponseEntity.badRequest()
                .body(new ErrorResponse(ConstantErrors.DATA_INTEGRITY_ERROR, errorMessage));
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<ErrorResponse> handleSQLException(SQLException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(ConstantErrors.SQL_EXCEPTION_ERROR,
                        ConstantErrors.SQL_EXCEPTION_MESSAGE + ex.getMessage()));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(ConstantErrors.GLOBAL_EXCEPTION_RUNTIME_ERROR,
                        ConstantErrors.GLOBAL_EXCEPTION_RUNTIME_MESSAGE + ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(ConstantErrors.GLOBAL_EXCEPTION_GENERAL_ERROR,
                        ConstantErrors.GLOBAL_EXCEPTION_GENERAL_MESSAGE + ex.getMessage()));
    }

    @ExceptionHandler({
            UserNotFoundException.class,
            AparcamientoNotFoundException.class
            // Añadir aquí más excepciones personalizadas si las tienes
    })
    public ResponseEntity<ErrorResponse> handleCustomNotFound(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse("Recurso no encontrado", ex.getMessage()));
    }

}
