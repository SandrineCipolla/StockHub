ARG NODE_VERSION=18.14.0

################################################################################

# Étape 1 : Construction
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS builder

# Set working directory for all build stages.
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

#RUN npm install && npm run build

# Étape 2 : Image de production
FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

RUN npm install --production

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD  [ "node", "dist/src/index.js" ]
