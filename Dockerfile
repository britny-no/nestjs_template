FROM node:20 AS builder

WORKDIR /
COPY . .

RUN chmod +x ./wait-for-it.sh
RUN npm cache clean --force && npm install
RUN npm run build

FROM node:20-alpine

WORKDIR /

RUN npm install pm2 -g
COPY --from=builder /dist /dist
COPY --from=builder /node_modules /node_modules
COPY --from=builder /package.json /package.json
COPY --from=builder /pm2.docker.json /pm2.docker.json

ENV TZ Asia/Seoul

EXPOSE 3000
ENTRYPOINT [ "pm2-runtime", "--json", "pm2.docker.json"]
