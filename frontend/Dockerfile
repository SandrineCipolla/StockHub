ARG NODE_VERSION=18.14.0


################################################################################

# Étape 1 : Construction
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS builder

ARG DEPLOY_TARGET=local
ENV DEPLOY_TARGET=$DEPLOY_TARGET

RUN echo "DEPLOY_TARGET is: $DEPLOY_TARGET"

# Set working directory for all build stages.
WORKDIR /usr/src/app

COPY package*.json ./
RUN rm -f package-lock.json
RUN npm install

COPY . .

RUN if [ "$DEPLOY_TARGET" = "local" ]; \
    then npm run build:localcontainer; \
    else npm run build; \
    fi

#Etape 2 : Image de production
# Use nginx image for base image for all stages(server static files).
FROM nginx:latest AS production

WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/src/app/dist .

# Copy your custom Nginx configuration (adjust path as needed)
COPY default.conf /etc/nginx/conf.d/default.conf

# Generate a self-signed SSL certificate
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/selfsigned.key \
  -out /etc/ssl/certs/selfsigned.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/OU=OrgUnit/CN=localhost"

