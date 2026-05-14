import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseURL: process.env.BASE_URL || 'https://example.com',
  username: process.env.USERNAME || '',
  password: process.env.PASSWORD || ''
};
