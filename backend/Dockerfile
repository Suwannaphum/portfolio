FROM node:24-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN DATABASE_URL=postgresql://portfolio:change-me@postgres:5432/portfolio npm run prisma:generate

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
