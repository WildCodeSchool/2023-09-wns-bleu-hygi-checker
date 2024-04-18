#!/bin/sh
git fetch origin && git reset --hard origin/staging && git clean -f -d && \
docker compose -f docker-compose.prod.yml down && \
docker compose -f docker-compose.prod.yml pull && \
docker compose -f docker-compose.prod.yml --env-file .env.staging up -d;