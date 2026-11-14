FROM mcr.microsoft.com/playwright:v1.49.1-jammy

RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg fonts-noto-color-emoji && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY . .

ENV NODE_ENV=production
CMD ["node", "src/cron.js"]
