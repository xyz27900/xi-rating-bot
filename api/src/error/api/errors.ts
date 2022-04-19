import { ApiErrorCode } from 'social-credits-common/build/cjs/api/error';
import { HttpStatus } from 'social-credits-common/build/cjs/api/status';
import { ApiError } from '@/error/api/index';

export const errInvalidQuery = ApiError.create(
  'Неправильный формат запроса',
  ApiErrorCode.InvalidQuery,
  HttpStatus.BAD_REQUEST
);

export const errInvalidId = ApiError.create(
  'Неправильный формат ID пользователя',
  ApiErrorCode.InvalidId,
  HttpStatus.BAD_REQUEST
);

export const errInvalidHash = ApiError.create(
  'Неправильная контрольная сумма',
  ApiErrorCode.InvalidHash,
  HttpStatus.UNAUTHORIZED
);

export const errUserNotFound = ApiError.create(
  'Пользователь не найден',
  ApiErrorCode.UserNotFound,
  HttpStatus.NOT_FOUND
);

export const errHarvestLinkNotFound = ApiError.create(
  'Ссылка не найдена',
  ApiErrorCode.HarvestLinkNotFound,
  HttpStatus.NOT_FOUND
);

export const errHarvestTimeout = ApiError.create(
  'Время сбора урожая ещё не наступило',
  ApiErrorCode.HarvestTimeout,
  HttpStatus.FORBIDDEN
);

export const errInvalidAmount = ApiError.create(
  'Неверное количество риса',
  ApiErrorCode.InvalidAmount,
  HttpStatus.BAD_REQUEST
);
