FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Instalar servidor para contenido estático
RUN npm install -g serve

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["serve", "-s", "build", "-l", "3000"]