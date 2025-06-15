### Autor: Jesús Milla Cabrera
### Portfolio: [jmilladev](https://jmilladev.web.app)
### GitHub: [jmilcab353](https://github.com/jmilcab353)
### Docker Hub: [jmilcab353](https://hub.docker.com/u/jmilcab353)

# Comparking 🚗  
Aplicación web prototipo desarrollada con **Spring Boot**, **Angular**, **MySQL** y **Docker** para compartir aparcamientos privados.  
Incluye API REST segura con JWT y paneles de usuario, moderador y administrador.

## 🚀 Servicios y Contenedores Docker

1. **Frontend**: Angular 19 con diseño responsive en modo oscuro.
2. **Backend**: API REST con Spring Boot y seguridad JWT.
3. **Base de Datos**: MySQL 8, inicializada con un script `init.sql`.

## 👥 Usuarios para probar la aplicación

| Usuario             | Contraseña   | Rol           | Descripción                    |
|---------------------|--------------|---------------|--------------------------------|
| `user@example.com`  | `userpass`   | `ROLE_USER`   | Usuario estándar               |
| `mod@example.com`   | `modpass`    | `ROLE_MOD`    | Moderador con permisos extra   |
| `admin@example.com` | `adminpass`  | `ROLE_ADMIN`  | Administrador completo         |

---

## 📦 Despliegue con Docker

### 1. Requisitos previos  
Asegúrate de tener instalados:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

### 2. Iniciar la aplicación

Ubícate en la raíz del proyecto y ejecuta:

```bash
docker-compose up --build
```

O en segundo plano:

```bash
docker-compose up --build -d
```

Esto construirá e iniciará los contenedores de:

- `comparking-backend`
- `comparking-frontend`
- `comparking-db`

---

### 3. Puertos disponibles

| Servicio   | Puerto     | URL de acceso               |
|------------|------------|-----------------------------|
| Frontend   | `4200`     | http://localhost:4200       |
| Backend    | `9000`     | http://localhost:9000       |
| Swagger    | `9000`     | http://localhost:9000/swagger-ui.html |
| MySQL DB   | `3306`     | Conexión local para DB tools |

> ⚠️ Asegúrate de que los puertos `3306`, `9000` y `4200` estén libres.

---

### 4. Ver estado de los contenedores

```bash
docker compose ps
```

---

### 5. Detener la aplicación

```bash
docker compose down
```

---

## 🧪 Autenticación y prueba con Postman

### 🔐 Login (obtener token JWT)

**Método:** `POST`  
**URL:** `http://localhost:9000/auth/login`  

**Body:**
```json
{
  "username": "user@example.com",
  "password": "userpass"
}
```

**Respuesta esperada:**
```json
{
  "role": "ROLE_USER",
  "token": "{token}",
  "user": "user@example.com"
}
```

📌 Usa el token en el header `Authorization`:

```
Authorization: Bearer {token}
```

---

## 📚 Documentación de la API

Disponible automáticamente tras arrancar el backend en:

👉 [Swagger UI](http://localhost:9000/swagger-ui.html)

---

## 🗂 Estructura del Proyecto

```
comparking/
├── backend/       → API REST en Spring Boot
├── frontend/      → Aplicación Angular 19
├── db/            → Script SQL de inicialización
├── docker-compose.yml
```

---

## 🐳 Imágenes Docker

Subidas a Docker Hub:

- [`jmilcab353/comparking-backend`](https://hub.docker.com/r/jmilcab353/comparking-backend)
- [`jmilcab353/comparking-frontend`](https://hub.docker.com/r/jmilcab353/comparking-frontend)
- [`jmilcab353/comparking-db`](https://hub.docker.com/r/jmilcab353/comparking-db)

---

### ✨ Gracias por echar un vistazo al proyecto 🙌