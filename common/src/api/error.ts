export type ApiErrorData = {
  code: ApiErrorCode;
  message: string;
}

export enum ApiErrorCode {
  InvalidQuery = 1001,
  InvalidId = 1002,
  InvalidHash = 1003,
  UserNotFound = 1004,
  HarvestLinkNotFound = 1005,

  HarvestTimeout = 2001,

  InvalidAmount = 3001,

  InternalError = 9999,
}
