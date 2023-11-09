# -------------------------------------
# build client
# -------------------------------------

# docker build -t sushi-shop .
# docker run -d -p 3000:8080 --name sushi-shop --rm sushi-shop

FROM node:18-alpine as client

WORKDIR /app/client

COPY client/package.json /app/client
COPY client/yarn.lock /app/client

RUN yarn

COPY client /app/client

RUN yarn build

# -------------------------------------
# build server
# -------------------------------------

FROM node:18-alpine AS server-build

WORKDIR /app

COPY server/package.json /app
COPY server/yarn.lock /app

RUN yarn

COPY server /app

RUN yarn build

FROM node:18-alpine

WORKDIR /app

COPY server/package.json /app
COPY server/yarn.lock /app

RUN yarn --production

COPY --from=server-build /app/dist /app

COPY --from=client /app/client/dist /app/client

ENV PORT=8080

EXPOSE 8080

CMD [ "node", "app.js" ]