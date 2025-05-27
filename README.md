### Autor: Jesús Milla Cabrera
### Portfolio: [jmilladev](https://jmilladev.web.app)
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

| Usuario     | Contraseña  | Rol          | Descripción                  |
| ----------- | ----------- | ------------ | ---------------------------- |
| `user@example.com`     | `userpass`  | `ROLE_USER`  | Usuario estándar             |
| `mod@example.com`      | `modpass`   | `ROLE_MOD`   | Moderador con permisos extra |
| `admin@example.com`     | `adminpass` | `ROLE_ADMIN` | Administrador completo       |

## Documentación de las API REST  

- [Swagger UI](http://localhost:9000/swagger-ui.html)  

## Probar la aplicación con Postman  

### 🔐 Login  

**Método:** `POST`  
**URL:** `http://localhost:9000/auth/login`  

**Body:**  

```json
{
    "username": "user@example.com",
    "password": "userpass"
}
```

Si la autenticación es correcta, obtendremos un token JWT en la respuesta.

```json	
{
    "role": "ROLE_USER",
    "token": "{token}",
    "user": "user@example.com"
}
```

Utilizaremos este token para las siguientes peticiones en el header `Authorization: Bearer {token}`.