# Guía de Dockerización - EcoGest Frontend

## 📋 Requisitos Previos

- Docker instalado ([Descargar](https://www.docker.com/products/docker-desktop))
- Docker Compose instalado
- Flyctl CLI instalado ([Descargar](https://fly.io/docs/hands-on/install-flyctl/))
- Cuenta en fly.io

## 🚀 Desarrollo Local con Docker Compose

### 1. Preparar el Proyecto

```bash
# Asegurar que tienes todas las dependencias
npm install

# Crear archivo .env.local si no existe
cp .env.docker .env.local
```

### 2. Ejecutar con Docker Compose

```bash
# Iniciar todos los servicios (frontend, backend, base de datos)
docker-compose up -d

# Ver logs
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f db
```

### 3. Acceder a la Aplicación

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080/api
- **Base de Datos:** localhost:3306

### 4. Detener los Servicios

```bash
# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (base de datos)
docker-compose down -v
```

## 🐳 Build Local de la Imagen Docker

```bash
# Build de la imagen
docker build -t ecogest-frontend:latest .

# Ejecutar contenedor
docker run -p 3000:3000 \
  -e VITE_API_URL=http://localhost:8080/api \
  ecogest-frontend:latest

# Con archivo .env
docker run -p 3000:3000 \
  --env-file .env.docker \
  ecogest-frontend:latest
```

## 🚀 Deploy en Fly.io

### 1. Autenticación en Fly.io

```bash
# Login en fly.io
flyctl auth login

# Verificar autenticación
flyctl auth whoami
```

### 2. Crear Aplicación en Fly.io

```bash
# Crear nueva aplicación (si no existe)
flyctl apps create ecogest-frontend

# O si ya existe, simplemente deploy
flyctl deploy
```

### 3. Configurar Variables de Entorno

```bash
# Establecer variable de entorno para la URL del backend
flyctl secrets set VITE_API_URL=https://ecogest-backend.fly.dev/api

# Ver secretos configurados
flyctl secrets list
```

### 4. Deploy de la Aplicación

```bash
# Deploy automático
flyctl deploy

# Deploy con logs en vivo
flyctl deploy --verbose

# Ver estado del deploy
flyctl status

# Ver logs en vivo
flyctl logs
```

### 5. Monitoreo y Mantenimiento

```bash
# Ver información de la aplicación
flyctl info

# Ver máquinas en ejecución
flyctl machines list

# Escalar máquinas
flyctl scale count 2

# Redeploy
flyctl deploy --force-machines

# Rollback a versión anterior
flyctl releases
flyctl releases rollback
```

## 🔗 Conectar Frontend con Backend

### Desarrollo Local (docker-compose)

El archivo `docker-compose.yml` ya configura la comunicación:
- Frontend: `http://backend:8080/api`
- Backend: Accesible en `http://localhost:8080`

### Producción (Fly.io)

1. **Backend debe estar deployado primero** en fly.io
2. **Obtener URL del backend:**
   ```bash
   flyctl apps list
   # Buscar tu app backend
   ```

3. **Actualizar variable de entorno:**
   ```bash
   flyctl secrets set VITE_API_URL=https://tu-backend.fly.dev/api
   ```

4. **Redeploy del frontend:**
   ```bash
   flyctl deploy
   ```

## 📝 Estructura de Archivos

```
ecogest-frontend/
├── Dockerfile                 # Configuración Docker
├── .dockerignore             # Archivos a ignorar en Docker
├── docker-compose.yml        # Orquestación local
├── fly.toml                  # Configuración Fly.io
├── .env.docker               # Variables de entorno Docker
├── DOCKER_SETUP.md           # Esta guía
├── src/
├── dist/                     # Build output
└── package.json
```

## 🔧 Troubleshooting

### El frontend no puede conectar con el backend

```bash
# Verificar que el backend está corriendo
docker-compose ps

# Verificar logs del frontend
docker-compose logs frontend

# Verificar conectividad de red
docker-compose exec frontend curl http://backend:8080/api/health
```

### Puerto 3000 ya está en uso

```bash
# Cambiar puerto en docker-compose.yml
# Cambiar: "3000:3000" a "3001:3000"

# O matar proceso en puerto 3000
lsof -ti:3000 | xargs kill -9
```

### Base de datos no inicializa

```bash
# Limpiar volúmenes y reiniciar
docker-compose down -v
docker-compose up -d

# Ver logs de DB
docker-compose logs db
```

### Deploy en Fly.io falla

```bash
# Verificar configuración
flyctl config show

# Ver logs detallados
flyctl logs --all

# Redeploy forzado
flyctl deploy --force-machines

# Verificar máquinas
flyctl machines list
```

## 📊 Monitoreo

### Logs en Tiempo Real

```bash
# Frontend
docker-compose logs -f frontend

# Todos los servicios
docker-compose logs -f

# Con timestamps
docker-compose logs -f --timestamps
```

### Health Checks

```bash
# Verificar salud de servicios
docker-compose ps

# Verificar endpoints
curl http://localhost:3000
curl http://localhost:8080/api/health
curl localhost:3306 -u root:root
```

## 🔐 Seguridad

### Variables Sensibles

Nunca commitear:
- `.env.local` (contiene credenciales)
- Secretos de Fly.io

### Usar Secrets en Fly.io

```bash
# Agregar secreto
flyctl secrets set DATABASE_PASSWORD=secure_password

# Remover secreto
flyctl secrets unset DATABASE_PASSWORD

# Listar secretos (no muestra valores)
flyctl secrets list
```

## 📚 Recursos Adicionales

- [Documentación Docker](https://docs.docker.com/)
- [Documentación Fly.io](https://fly.io/docs/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Fly.io Deployment Guide](https://fly.io/docs/getting-started/get-set-up/)

## 💡 Tips Útiles

### Desarrollo Rápido

```bash
# Rebuild solo el frontend sin afectar otros servicios
docker-compose up -d --build frontend

# Reiniciar un servicio
docker-compose restart frontend
```

### Limpiar Recursos

```bash
# Eliminar imágenes no usadas
docker image prune

# Eliminar contenedores no usados
docker container prune

# Limpiar todo (cuidado!)
docker system prune -a
```

### Debugging

```bash
# Entrar en el contenedor
docker-compose exec frontend sh

# Ejecutar comando en contenedor
docker-compose exec frontend npm run build

# Ver variables de entorno
docker-compose exec frontend env
```
