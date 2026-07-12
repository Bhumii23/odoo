# TransitOps

A Smart Transport Operations Platform.

## Prerequisites
- Node.js
- Docker

## Setup
1. Clone the repository
2. Run database container: `docker compose up -d`
3. Install dependencies in both `/client` and `/server`:
   - `cd client && npm install`
   - `cd server && npm install`
4. Setup database schema (from `/server`):
   - `npx prisma migrate dev`
5. Run the dev servers:
   - In `/client`: `npm run dev`
   - In `/server`: `npm run dev`

## Folder Structure
- `client/`: Vite + React + Tailwind frontend
- `server/`: Express + Node.js + Prisma backend
- `shared/`: Shared types and utilities
