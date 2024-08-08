# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=18.14.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine

# Set working directory for all build stages.
WORKDIR /usr/src/app

COPY . .

RUN npm install && npm run build

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD  [ "npm", "run", "start:prod" ]
