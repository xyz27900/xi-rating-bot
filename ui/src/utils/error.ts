import { ApiErrorCode } from '@xyz27900/xi-rating-bot-common/build/es/api/error';
import { errorIcons } from '@/constants/error.constants';
import { arrayIncludes } from '@/utils/array';
import { objectValues } from '@/utils/object';

export const getErrorIcon = (code: number): string => {
  const codes = objectValues(ApiErrorCode);
  return isNaN(code) || !arrayIncludes(codes, code)
    ? errorIcons[ApiErrorCode.InternalError]
    : errorIcons[code];
};
