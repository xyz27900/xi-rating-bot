import { ApiErrorCode } from '@xyz27900/xi-rating-bot-common/build/es/api/error';

export const errorIcons: Record<ApiErrorCode, string> = {
  [ApiErrorCode.InvalidQuery]: '🔡',
  [ApiErrorCode.InvalidId]: '🆔',
  [ApiErrorCode.InvalidHash]: '🔐',
  [ApiErrorCode.UserNotFound]: '🤷‍♂️',
  [ApiErrorCode.HarvestLinkNotFound]: '🤷‍♀️',
  [ApiErrorCode.HarvestTimeout]: '⏳',
  [ApiErrorCode.InvalidAmount]: '🔢',
  [ApiErrorCode.InternalError]: '😢',
};
