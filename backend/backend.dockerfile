# Etapa 1: Build
FROM node:18-alpine AS build-env
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Etapa 2: Runtime ejecutable
FROM node:18-alpine
WORKDIR /app
COPY --from=build-env /app ./

# Aplicar principio de menor privilegio (Usuario no root)
USER node 

EXPOSE 3000
CMD ["node", "server.js"]