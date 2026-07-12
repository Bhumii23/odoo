FROM node:18-alpine

WORKDIR /app

# Install shared dependencies first
COPY shared/package*.json ./shared/
RUN cd shared && npm install

# Install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy source code
COPY shared/ ./shared/
COPY server/ ./server/

WORKDIR /app/server
RUN npx prisma generate

# Expose API port
EXPOSE 3000

# Automatically push schema, run seed, and start the dev server
CMD ["sh", "-c", "npx prisma db push && npx prisma db seed && npm run dev"]
