FROM node:20.9.0-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm i

# hot reload
RUN apk --update --no-cache add curl 

COPY ./tsconfig.json ./tsconfig.json
COPY ./next.config.mjs ./next.config.mjs
COPY ./tailwind.config.ts ./tailwind.config.ts
COPY ./postcss.config.js ./postcss.config.js
COPY ./public ./public
COPY ./src ./src
COPY .env .env

CMD npm run dev