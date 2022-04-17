FROM node:lts-alpine as api-builder

WORKDIR /app

COPY ./api ./
COPY ./package-lock.json ./

RUN npm ci
RUN npm run build

FROM node:lts-alpine as ui-builder

WORKDIR /app

COPY ./ui ./
COPY ./package-lock.json ./

RUN npm ci
RUN npm run build

FROM node:lts-alpine as runner

RUN apk add make

WORKDIR /app

COPY --from=api-builder /app/node_modules ./node_modules
COPY --from=api-builder /app/build ./
COPY --from=ui-builder /app/build ./public
COPY ./Makefile ./

ENV NODE_ENV production
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

EXPOSE 3000

CMD make migrate && make start
