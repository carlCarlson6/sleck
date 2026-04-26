# Use official Node.js image for frontend development
FROM node:20-alpine

WORKDIR /app

# Install dependencies first (for better layer caching)
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Default command: development mode
CMD ["npm", "run", "dev"]
