package dev.jmilla.comparking.exception;

public class ConstantErrors {

    private ConstantErrors() {
        throw new UnsupportedOperationException("Utility class");
    }

    // ─────────────────────────────
    // Errores de validación
    // ─────────────────────────────
    public static final String VALIDATION_ERROR_TITLE = "Error de validación";

    // ─────────────────────────────
    // Errores de autenticación
    // ─────────────────────────────
    public static final String AUTH_CREDENCIALES_INCORRECTAS_TITLE = "Credenciales incorrectas";
    public static final String AUTH_CREDENCIALES_INCORRECTAS_MESSAGE = "Las credenciales proporcionadas no son válidas";
    public static final String AUTH_GENERAL_TITLE = "Error de autenticación";
    public static final String AUTH_GENERAL_MESSAGE = "Hubo un problema al intentar autenticar al usuario";

    // ─────────────────────────────
    // Errores de base de datos
    // ─────────────────────────────
    public static final String DATA_INTEGRITY_TITLE = "Error de integridad de datos";
    public static final String DATA_INTEGRITY_MESSAGE = "No se puede completar la operación debido a restricciones de la base de datos: ";

    public static final String SQL_EXCEPTION_TITLE = "Error en la base de datos";
    public static final String SQL_EXCEPTION_MESSAGE = "Se ha producido un problema al procesar la solicitud.";

    // ─────────────────────────────
    // Errores de seguridad / JWT
    // ─────────────────────────────
    public static final String SECURITY_TOKEN_INVALIDO_FIRMA = "Error en la firma del token";
    public static final String SECURITY_TOKEN_INCORRECTO = "Token incorrecto";
    public static final String SECURITY_TOKEN_EXPIRADO = "Token expirado";

    // ─────────────────────────────
    // Errores de petición (HTTP 400)
    // ─────────────────────────────
    public static final String BAD_REQUEST_TITLE = "Petición incorrecta";
    public static final String MALFORMED_JSON_MESSAGE = "El cuerpo JSON tiene un formato inválido.";

    // ─────────────────────────────
    // Errores generales (HTTP 500)
    // ─────────────────────────────
    public static final String GLOBAL_EXCEPTION_GENERAL_TITLE = "Error interno del servidor";
    public static final String GLOBAL_EXCEPTION_GENERAL_MESSAGE = "Ha ocurrido un error inesperado: ";
    public static final String GLOBAL_EXCEPTION_RUNTIME_TITLE = "Error de ejecución";
    public static final String GLOBAL_EXCEPTION_RUNTIME_MESSAGE = "Se ha producido un error inesperado en la aplicación: ";

    // ─────────────────────────────
    // Recurso no encontrado (HTTP 404)
    // ─────────────────────────────
    public static final String RESOURCE_NOT_FOUND_TITLE = "No se encuentra el recurso solicitado.";
    
}
