# Use official Node.js image for backend development
FROM node:20-alpine

WORKDIR /app

# Install dependencies first (for better layer caching)
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Expose backend port
EXPOSE 3001

# Default command: development mode
CMD ["npm", "run", "dev"]
