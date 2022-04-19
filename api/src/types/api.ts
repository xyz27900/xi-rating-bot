import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { ApiErrorData } from 'social-credits-common/build/cjs/api/error';
import { RiceCollectLink } from '@/entity/rice.collect.link.entity';
import { User } from '@/entity/user.entity';

export interface ApiQuery {
  [key: string]: undefined | string | string[] | ApiQuery | ApiQuery[];
}

export type ApiRequest<ReqBody = Record<string, string>, ReqQuery = ApiQuery> = ExpressRequest<Object, any, ReqBody, ReqQuery>;
export type ApiResponse<ResBody = Record<string, string>> = ExpressResponse<ResBody>;

export type AuthApiRequest<ReqBody = Record<string, string>, ReqQuery = ApiQuery> = ApiRequest<ReqBody, ReqQuery> & {
  user: User;
  harvestLink: RiceCollectLink;
};

export type ApiMiddleware = (req: ApiRequest, res: ApiResponse, next: NextFunction) => Promise<void> | void;
export type ApiRouteHandler<ResBody = Record<string, string>, ReqBody = Record<string, string>, ReqQuery = ApiQuery> = (req: ApiRequest<ReqBody, ReqQuery>, res: ApiResponse<ResBody>) => Promise<void> | void;
export type ApiErrorHandler = (err: any, req: ApiRequest | AuthApiRequest, res: ApiResponse<ApiErrorData>, next: NextFunction) => Promise<void> | void;
