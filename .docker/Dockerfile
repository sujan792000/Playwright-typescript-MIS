FROM mcr.microsoft.com/playwright:v1.49.0-jammy

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Ensure browsers and dependencies are installed for Playwright
RUN npx playwright install --with-deps

ENV CI=true
ENV NODE_ENV=development

ENTRYPOINT ["npm", "test"]
