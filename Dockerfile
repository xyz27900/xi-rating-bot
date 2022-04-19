FROM node:lts-alpine as api-builder
ARG ACCESS_TOKEN

WORKDIR /app

COPY ./api ./

RUN echo //npm.pkg.github.com/:_authToken=$ACCESS_TOKEN >> .npmrc

RUN npm install
RUN npm run build

RUN rm -rf ./node_modules
RUN npm install --production

FROM node:lts-alpine as ui-builder
ARG ACCESS_TOKEN

WORKDIR /app

COPY ./ui ./

RUN echo //npm.pkg.github.com/:_authToken=$ACCESS_TOKEN >> .npmrc

RUN npm install
RUN npm run build

FROM node:lts-alpine as runner
ARG NODE_ENV

RUN apk add curl make

WORKDIR /app

COPY --from=api-builder /app/node_modules ./node_modules
COPY --from=api-builder /app/build ./
COPY --from=ui-builder /app/build ./public
COPY ./Makefile ./

ENV NODE_ENV $NODE_ENV
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

CMD make migrate && make start
