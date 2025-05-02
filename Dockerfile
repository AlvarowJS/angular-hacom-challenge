# Dockerfile

FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala Angular CLI versión 11
RUN npm install -g @angular/cli@11

# Instala dependencias del proyecto
RUN npm install

# Copia todo el proyecto
COPY . .

# Expone el puerto de Angular
EXPOSE 4200

# Comando para iniciar el servidor de desarrollo
CMD ["ng", "serve", "--host", "0.0.0.0"]
