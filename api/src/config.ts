import * as dotenv from 'dotenv';

dotenv.config();

export const BOT_TOKEN = String(process.env.BOT_TOKEN);
export const DOMAIN = String(process.env.DOMAIN);
export const PORT = Number(process.env.PORT);
export const DATABASE_URL = String(process.env.DATABASE_URL);
export const SENTRY_DSN = String(process.env.SENTRY_DSN);
export const FAQ_URL = String(process.env.FAQ_URL);
export const SELF_DECREASE_IMAGE_URL = String(process.env.SELF_DECREASE_IMAGE_URL);
export const SELF_INCREASE_IMAGE_URL = String(process.env.SELF_INCREASE_IMAGE_URL);
