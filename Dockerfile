# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Build de la aplicación
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Instalar serve para servir la aplicación estática
RUN npm install -g serve

# Copiar build desde el stage anterior
COPY --from=builder /app/dist ./dist

# Exponer puerto
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Comando para iniciar la aplicación
CMD ["serve", "-s", "dist", "-l", "3000"]
