import * as dotenv from 'dotenv';

// Load local environment variables from .env only when not running in CI.
if (!process.env.CI) {
  dotenv.config();
}

export const config = {
  baseURL: process.env.BASE_URL || 'https://example.com',
  username: process.env.USERNAME || '',
  password: process.env.PASSWORD || ''
};
