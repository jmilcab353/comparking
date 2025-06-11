package dev.jmilla.comparking.exception;

import dev.jmilla.comparking.exception.custom.AparcamientoNotFoundException;
import dev.jmilla.comparking.exception.custom.UserNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseBody> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.joining(", "));
        HttpStatus status = HttpStatus.BAD_REQUEST;

        return ResponseEntity.status(status).body(
                ErrorResponseBody.builder()
                        .error(ConstantErrors.VALIDATION_ERROR_TITLE)
                        .message(errorMessage)
                        .httpCode(status.value())
                        .build()
        );
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponseBody> handleJSONParseError(HttpMessageNotReadableException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;

        return ResponseEntity.status(status).body(
                ErrorResponseBody.builder()
                        .error(ConstantErrors.BAD_REQUEST_TITLE)
                        .message(ConstantErrors.MALFORMED_JSON_MESSAGE)
                        .httpCode(status.value())
                        .build()
        );
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponseBody> handleBadCredentials(BadCredentialsException ex) {
        HttpStatus status = HttpStatus.UNAUTHORIZED;

        return ResponseEntity.status(status).body(
                ErrorResponseBody.builder()
                        .error(ConstantErrors.AUTH_CREDENCIALES_INCORRECTAS_TITLE)
                        .message(ConstantErrors.AUTH_CREDENCIALES_INCORRECTAS_MESSAGE)
                        .httpCode(status.value())
                        .build()
        );
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponseBody> handleAuthenticationException(AuthenticationException ex) {
        HttpStatus status = HttpStatus.UNAUTHORIZED;

        return ResponseEntity.status(status).body(
                ErrorResponseBody.builder()
                        .error(ConstantErrors.AUTH_GENERAL_TITLE)
                        .message(ConstantErrors.AUTH_GENERAL_MESSAGE)
                        .httpCode(status.value())
                        .build()
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponseBody> handleDataIntegrityException(DataIntegrityViolationException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message = ex.getMostSpecificCause().getMessage();
        String fieldName = "El valor ingresado";
        String errorMessage;

        if (message.contains("Duplicate entry")) {
            if (message.contains("for key 'user.UK")) {
                fieldName = "El correo electrónico";
            }
            errorMessage = fieldName + " ya está registrado. Intenta con otro.";
        } else {
            errorMessage = ConstantErrors.DATA_INTEGRITY_MESSAGE + message;
        }

        return ResponseEntity.status(status).body(
                ErrorResponseBody.builder()
                        .error(ConstantErrors.DATA_INTEGRITY_TITLE)
                        .message(errorMessage)
                        .httpCode(status.value())
                        .build()
        );
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<ErrorResponseBody> handleSQLException(SQLException ex) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        return ResponseEntity.status(status).body(
                ErrorResponseBody.builder()
                        .error(ConstantErrors.SQL_EXCEPTION_TITLE)
                        .message(ConstantErrors.SQL_EXCEPTION_MESSAGE)
                        .httpCode(status.value())
                        .build()
        );
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponseBody> handleRuntimeException(RuntimeException ex) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        return ResponseEntity.status(status).body(
                ErrorResponseBody.builder()
                        .error(ConstantErrors.GLOBAL_EXCEPTION_RUNTIME_TITLE)
                        .message(ConstantErrors.GLOBAL_EXCEPTION_RUNTIME_MESSAGE + ex.getMessage())
                        .httpCode(status.value())
                        .build()
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseBody> handleException(Exception ex) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        return ResponseEntity.status(status).body(
                ErrorResponseBody.builder()
                        .error(ConstantErrors.GLOBAL_EXCEPTION_GENERAL_TITLE)
                        .message(ConstantErrors.GLOBAL_EXCEPTION_GENERAL_MESSAGE + ex.getMessage())
                        .httpCode(status.value())
                        .build()
        );
    }

    @ExceptionHandler({
            UserNotFoundException.class,
            AparcamientoNotFoundException.class
            // Añadir más excepciones personalizadas aquí si es necesario
    })
    public ResponseEntity<ErrorResponseBody> handleCustomNotFound(RuntimeException ex) {
        HttpStatus status = HttpStatus.NOT_FOUND;

        return ResponseEntity.status(status).body(
                ErrorResponseBody.builder()
                        .error(ConstantErrors.RESOURCE_NOT_FOUND_TITLE)
                        .message(ex.getMessage())
                        .httpCode(status.value())
                        .build()
        );
    }

}
