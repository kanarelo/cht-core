FROM alpine:3.15 AS base_build

RUN apk add --update --no-cache \
  build-base \
  curl \
  nodejs~=16 \
  npm~=8 \
  tzdata \
  libxslt \
  bash \
  jq

WORKDIR /service

COPY package.json package-lock.json ./
COPY shared-libs ./shared-libs
COPY node_modules/@medic ./node_modules/@medic
COPY api ./api

ENV NODE_PATH=/service/api/node_modules

ENTRYPOINT ["/bin/bash", "/service/api/docker-entrypoint.sh", "main"]
