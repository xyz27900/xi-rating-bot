import express, { Express } from 'express';
import Router from 'express-promise-router';
import { Bot, webhookCallback } from 'grammy';
import { isDevelopment } from '@/env';
import { authMiddleware } from '@/middleware/auth.middleware';
import { errorApiMiddleware } from '@/middleware/error.api.middleware';
import { errorBotMiddleware } from '@/middleware/error.bot.middleware';
import { errorDbMiddleware } from '@/middleware/error.db.middleware';
import { errorInternalMiddleware } from '@/middleware/error.internal.middleware';
import { loginRoute } from '@/route/login.route';
import { saveRoute } from '@/route/save.route';

export const initServer = async (bot: Bot, botRoute: string): Promise<Express> => {
  const router = Router();

  server.use(router);
  router.use(express.json());

  router.use(botRoute, webhookCallback(bot, 'express'));
  router.get('/api/login', authMiddleware, loginRoute);
  router.post('/api/save', authMiddleware, saveRoute);

  if (!isDevelopment) {
    router.use(express.static('public'));
    router.get('*', (_, res) => {
      res.sendFile('index.html', { root: 'public' });
    });
  }

  router.use(errorApiMiddleware);
  router.use(errorBotMiddleware);
  router.use(errorDbMiddleware);
  router.use(errorInternalMiddleware);

  return server;
};

export const server = express();
