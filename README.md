### Autor: Jesús Milla Cabrera  
### GitHub: [jmilcab353](https://github.com/jmilcab353)  
### Docker Hub: [jmilcab353](https://hub.docker.com/u/jmilcab353)  

# Comparking
Aplicación web prototipo con Spring Boot, Angular, MySQL y Docker para compartir aparcamientos privados.
Desarrollo de un servidor REST API con **Spring Boot** y conexión desde el sitio web con **Angular**.

## Servicios y Contenedores  

1. **Frontend**: Aplicación Angular con HTML, CSS y JavaScript para mostrar datos obtenidos del backend.
2. **Backend**: API REST en Spring Boot que se comunica con una base de datos para extraer información. 
3. **Base de Datos**: Contenedor **MySQL** con datos de ejemplo (ver archivo `sql/init.sql`).

## Usuarios para probar la aplicación  

(Más adelante se verá cómo crear usuarios y permisos)

## Documentación de las API REST  

- [Swagger UI](http://localhost:9000/swagger-ui.html)  

## Probar la aplicación con Postman  

### 🔐 Login  

**Método:** `POST`  
**URL:** `http://localhost:9000/auth/login`  

**Body:**  

```json
{
    "username": "jesusito",
    "password": "admin"
}
```

Si la autenticación es correcta, obtendremos un token JWT en la respuesta.

```json	
{
    "role": "ROLE_ADMIN",
    "token": "{token}",
    "user": "jesusito"
}
```

Utilizaremos este token para las siguientes peticiones en el header `Authorization: Bearer <token>`.