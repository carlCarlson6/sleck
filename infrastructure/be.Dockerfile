# Dockerfile for Sleck Backend (be/)
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm ci
EXPOSE 4000
CMD ["npm", "run", "dev"]
