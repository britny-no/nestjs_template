FROM node:20 AS builder

WORKDIR /service
COPY . .

RUN chmod +x ./wait-for-it.sh
RUN npm cache clean --force && npm install
RUN npm run build

FROM node:20-alpine

WORKDIR /service
RUN npm install pm2 -g
COPY --from=builder /service/dist /service/dist
COPY --from=builder /service/node_modules /service/node_modules
COPY --from=builder /service/package.json /service/package.json
COPY --from=builder /service/envs ./envs
COPY --from=builder /service/pm2.docker.json /service/pm2.docker.json
COPY --from=builder /service/tinker-360202-3eb53b38ce3c.json /service/tinker-360202-3eb53b38ce3c.json

ENV TZ Asia/Seoul

EXPOSE 3000
ENTRYPOINT [ "pm2-runtime", "--json", "pm2.docker.json"]
