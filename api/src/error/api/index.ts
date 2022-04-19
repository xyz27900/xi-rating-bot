import { ApiErrorCode, ApiErrorData } from '@xyz27900/xi-rating-bot-common/build/cjs/api/error';
import { HttpStatus } from '@xyz27900/xi-rating-bot-common/build/cjs/api/status';

export class ApiError {
  public data: ApiErrorData;
  public status: HttpStatus;

  constructor(data: ApiErrorData, status: HttpStatus) {
    this.data = data;
    this.status = status;
  }

  public static create(message: string, code: ApiErrorCode, status: HttpStatus): ApiError {
    return new ApiError({ code, message }, status);
  }
}
