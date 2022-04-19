import {
  errHarvestLinkNotFound,
  errInvalidHash,
  errInvalidId,
  errInvalidQuery,
  errUserNotFound,
} from '@/error/api/errors';
import { riceService } from '@/service/rice.service';
import { userService } from '@/service/user.service';
import { ApiMiddleware, AuthApiRequest } from '@/types/api';
import { hashValidator } from '@/validators/hash.validator';

export const authMiddleware: ApiMiddleware = async (req, res, next) => {
  const { rid, ...params } = req.query;

  if (typeof params.id !== 'string' || typeof rid !== 'string') {
    throw errInvalidQuery;
  }

  const id = Number(params.id);
  if (isNaN(id)) {
    throw errInvalidId;
  }

  const isHashValid = hashValidator(params);
  if (!isHashValid) {
    throw errInvalidHash;
  }

  const user = await userService.getUserById(id);
  if (!user) {
    throw errUserNotFound;
  }

  const riceCollectLink = await riceService.getUserRiceCollectLink(user);
  if (!riceCollectLink) {
    throw errHarvestLinkNotFound;
  }

  (req as AuthApiRequest).user = user;
  (req as AuthApiRequest).harvestLink = riceCollectLink;

  await next();
};
