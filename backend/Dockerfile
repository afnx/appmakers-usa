FROM node:lts-bookworm-slim AS base

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
  netcat-openbsd openssl curl \
  && rm -rf /var/lib/apt/lists/*

# Install all dependencies for development
FROM base AS deps-development

ENV NODE_ENV=development

COPY package*.json ./

RUN npm ci

# Install only production dependencies
FROM base AS deps-production

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --only=production

# Development stage
FROM base AS development

ENV NODE_ENV=development

COPY --from=deps-development /app/node_modules ./node_modules
COPY . .

CMD [ "npm", "run", "dev" ]

# Production stage
FROM base AS production

ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 appuser

COPY --from=deps-production /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src
COPY public ./public

RUN chown -R appuser:nodejs ./node_modules ./package*.json ./src ./public

USER appuser

EXPOSE 5000

HEALTHCHECK --interval=1m --timeout=5s --start-period=1m --retries=3 \
  CMD curl -f http://localhost:5000 || exit 1

CMD [ "npm", "start" ]