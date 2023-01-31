FROM node:18-alpine as builder

WORKDIR /app

COPY --chown=node:node package.json .

RUN npm install

COPY --chown=node:node . .

USER node


CMD ["sh", "/app/docker/entrypoint.sh"]
