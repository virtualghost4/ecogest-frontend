# 🚀 Quick Start - Docker & Fly.io

## Inicio Rápido

### Opción 1: Desarrollo Local con Docker Compose

```bash
# Hacer script ejecutable (solo primera vez)
chmod +x scripts/docker-compose-local.sh

# Iniciar todos los servicios
./scripts/docker-compose-local.sh start

# O con docker-compose directamente
docker-compose up -d

# Acceder a la aplicación
# Frontend: http://localhost:3000
# Backend: http://localhost:8080/api
```

### Opción 2: Deploy en Fly.io

```bash
# Hacer script ejecutable (solo primera vez)
chmod +x scripts/deploy-fly.sh

# Deploy interactivo
./scripts/deploy-fly.sh

# O deploy directo
./scripts/deploy-fly.sh deploy

# Acceder a la aplicación
# https://ecogest-frontend.fly.dev
```

## 📋 Comandos Útiles

### Docker Compose Local

```bash
# Ver estado
docker-compose ps

# Ver logs
docker-compose logs -f

# Logs de un servicio
docker-compose logs -f frontend
docker-compose logs -f backend

# Detener
docker-compose down

# Detener y limpiar base de datos
docker-compose down -v

# Rebuild
docker-compose up -d --build
```

### Fly.io

```bash
# Ver información
flyctl info

# Ver logs
flyctl logs

# Ver máquinas
flyctl machines list

# Redeploy
flyctl deploy

# Rollback
flyctl releases
flyctl releases rollback

# Configurar variables
flyctl secrets set VITE_API_URL=https://tu-backend.fly.dev/api
```

## 🔗 Conectar Frontend con Backend

### Desarrollo Local
- Frontend conecta a: `http://backend:8080/api`
- Automático en docker-compose

### Producción Fly.io
1. Backend debe estar deployado primero
2. Obtener URL: `https://tu-backend.fly.dev`
3. Configurar variable:
   ```bash
   flyctl secrets set VITE_API_URL=https://tu-backend.fly.dev/api
   ```
4. Redeploy:
   ```bash
   flyctl deploy
   ```

## 📝 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `Dockerfile` | Configuración Docker |
| `docker-compose.yml` | Orquestación local |
| `fly.toml` | Configuración Fly.io |
| `.env.docker` | Variables de entorno |
| `DOCKER_SETUP.md` | Guía completa |
| `scripts/deploy-fly.sh` | Script deploy Fly.io |
| `scripts/docker-compose-local.sh` | Script docker-compose |

## ✅ Checklist de Deploy

### Antes de Deploy en Fly.io

- [ ] Backend deployado en Fly.io
- [ ] Obtener URL del backend
- [ ] Verificar que `fly.toml` existe
- [ ] Autenticado en Fly.io (`flyctl auth login`)
- [ ] Variables de entorno configuradas

### Deploy

- [ ] Build local: `npm run build`
- [ ] Deploy: `flyctl deploy`
- [ ] Verificar: `flyctl status`
- [ ] Ver logs: `flyctl logs`

## 🆘 Troubleshooting Rápido

**Frontend no conecta con backend**
```bash
# Verificar URL en variables
flyctl secrets list

# Redeploy con nueva URL
flyctl secrets set VITE_API_URL=https://tu-backend.fly.dev/api
flyctl deploy
```

**Puerto 3000 en uso**
```bash
# Cambiar en docker-compose.yml
# "3000:3000" → "3001:3000"
```

**Base de datos no inicializa**
```bash
docker-compose down -v
docker-compose up -d
```

**Deploy falla**
```bash
# Ver logs detallados
flyctl logs --all

# Redeploy forzado
flyctl deploy --force-machines
```

## 📚 Documentación Completa

Ver `DOCKER_SETUP.md` para guía detallada con:
- Configuración avanzada
- Monitoreo
- Seguridad
- Debugging
- Recursos adicionales

## 💡 Tips

- Usa `docker-compose ps` para ver estado
- `docker-compose logs -f` para debugging
- `flyctl logs` para monitoreo en producción
- Siempre hacer backup antes de `docker-compose down -v`
- Usar secretos en Fly.io para credenciales sensibles
