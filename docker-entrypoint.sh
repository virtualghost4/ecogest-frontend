#!/bin/sh

# Crear archivo de configuración con la URL del API
cat > /usr/share/nginx/html/config.js << EOF
window.__API_URL__ = '${VITE_API_URL:-http://ecogest-app:8080/api}';
EOF

echo "API URL configurada: ${VITE_API_URL:-http://ecogest-app:8080/api}"

# Iniciar nginx
exec nginx -g "daemon off;"
