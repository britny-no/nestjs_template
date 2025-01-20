FROM node:20 AS builder

WORKDIR /api
COPY . .

RUN chmod +x ./wait-for-it.sh
RUN npm cache clean --force && npm install
RUN npm run build

FROM node:20-alpine

WORKDIR /api

RUN npm install pm2 -g
COPY --from=builder /api/dist /api/dist
COPY --from=builder /api/node_modules /api/node_modules
COPY --from=builder /api/package.json /api/package.json
COPY --from=builder /api/pm2.docker.json /api/pm2.docker.json

ENV TZ Asia/Seoul

EXPOSE 3000
ENTRYPOINT [ "pm2-runtime", "--json", "pm2.docker.json"]
