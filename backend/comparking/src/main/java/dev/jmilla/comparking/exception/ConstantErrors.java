package dev.jmilla.comparking.exception;

public class ConstantErrors {

    private ConstantErrors() {
        throw new UnsupportedOperationException("Utility class");
    }

    public static final String GLOBAL_EXCEPTION_GENERAL_ERROR = "Error interno del servidor";
    public static final String GLOBAL_EXCEPTION_GENERAL_MESSAGE = "Ha ocurrido un error inesperado: ";
    public static final String GLOBAL_EXCEPTION_RUNTIME_ERROR = "Error de ejecución";
    public static final String GLOBAL_EXCEPTION_RUNTIME_MESSAGE = "Se ha producido un error inesperado en la aplicación: ";

    public static final String AUTH_CREDENCIALES_INCORRECTAS_ERROR = "Credenciales incorrectas";
    public static final String AUTH_CREDENCIALES_INCORRECTAS_DESCRIPCION = "Las credenciales proporcionadas no son válidas";
    public static final String AUTH_GENERAL_ERROR = "Error de autenticación";
    public static final String AUTH_GENERAL_DESCRIPCION = "Hubo un problema al intentar autenticar al usuario";

    public static final String SQL_EXCEPTION_ERROR = "Error en la base de datos";
    public static final String SQL_EXCEPTION_MESSAGE = "Se ha producido un problema al procesar la solicitud: ";

    public static final String DATA_INTEGRITY_ERROR = "Error de integridad de datos";
    public static final String DATA_INTEGRITY_MESSAGE = "No se puede completar la operación debido a restricciones de la base de datos: ";

    public static final String SECURITY_TOKEN_INVALIDO_FIRMA = "Error en la firma del token";
    public static final String SECURITY_TOKEN_INCORRECTO = "Token incorrecto";
    public static final String SECURITY_TOKEN_EXPIRADO = "Token expirado";
}
