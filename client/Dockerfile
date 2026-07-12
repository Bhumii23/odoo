FROM node:22-alpine

WORKDIR /app

# Install shared dependencies first
COPY shared/package*.json ./shared/
RUN cd shared && npm install

# Install client dependencies
COPY client/package*.json ./client/
RUN cd client && npm install

# Copy source code
COPY shared/ ./shared/
COPY client/ ./client/

WORKDIR /app/client

# Expose Vite dev port
EXPOSE 5173

# Start the dev server and explicitly bind to all network interfaces
CMD ["npm", "run", "dev", "--", "--host"]
