#!/bin/sh
git fetch origin && git reset --hard origin/staging && git clean -f -d && \
docker compose -f docker-compose.prod.yml down && \
docker container prune --force && \
docker image prune -a --force && \
docker compose -f docker-compose.prod.yml pull && \
docker compose -f docker-compose.prod.yml --env-file .env.staging up -d && \
docker exec 2023-09-wns-bleu-hygi-checker-backend-1 npm run resetDB;