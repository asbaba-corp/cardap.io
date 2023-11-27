FROM cgr.dev/chainguard/node:latest-dev as build

WORKDIR /usr/app

COPY --chown=node:node package*.json ./

RUN npm install --legacy-peer-deps

COPY --chown=node:node . .

RUN npm run build

FROM cgr.dev/chainguard/node as production

WORKDIR /usr/app

COPY --chown=node:node --from=build /usr/app ./

CMD ["dist/main.js"]