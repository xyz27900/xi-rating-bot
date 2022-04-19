import { ApiRouteHandler } from '@/types/api';

export const pingRoute: ApiRouteHandler = (req, res) => {
  res.status(200).json('pong');
};
