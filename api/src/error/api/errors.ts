import { ApiErrorCode } from '@xyz27900/xi-rating-bot-common/build/cjs/api/error';
import { HttpStatus } from '@xyz27900/xi-rating-bot-common/build/cjs/api/status';
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
  'Неправильное количество риса',
  ApiErrorCode.InvalidAmount,
  HttpStatus.BAD_REQUEST
);

export const errInternalError = ApiError.create(
  'Ошибка на сервере',
  ApiErrorCode.InternalError,
  HttpStatus.INTERNAL_SERVER_ERROR
);
