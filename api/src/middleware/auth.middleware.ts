import { harvestService, userService } from '@/core/services';
import {
  errHarvestLinkNotFound,
  errInvalidHash,
  errInvalidId,
  errInvalidQuery,
  errUserNotFound,
} from '@/error/api/errors';
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

  const harvestLink = await harvestService.getUserHarvestLink(user);
  if (!harvestLink) {
    throw errHarvestLinkNotFound;
  }

  if (rid !== harvestLink.id) {
    throw errHarvestLinkNotFound;
  }

  (req as AuthApiRequest).user = user;
  (req as AuthApiRequest).harvestLink = harvestLink;

  await next();
};
