FROM node:22-slim

WORKDIR /app

# Ensure playwright deps are available
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY patches ./patches
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm turbo run build

CMD ["node", "apps/cli/dist/index.js", "doctor"]
