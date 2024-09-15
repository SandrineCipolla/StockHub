ARG NODE_VERSION=18.14.0

################################################################################

# Étape 1 : Construction
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS builder

# Set working directory for all build stages.
WORKDIR /usr/src/app

COPY package*.json ./
RUN rm -f package-lock.json
RUN npm install

COPY . .
RUN npm run build

#Etape 2 : Image de production
# Use nginx image for base image for all stages(server static files).
FROM nginx:latest AS production

WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/src/app/dist .


