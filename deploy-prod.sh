#!/bin/sh
git fetch origin && git reset --hard origin/main && git clean -f -d && \
docker compose -f docker-compose.prod.yml down && \
docker container prune --force && \
docker image prune -a --force && \
docker compose -f docker-compose.prod.yml pull && \
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d;