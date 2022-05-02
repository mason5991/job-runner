FROM node:14.18.0-alpine as build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM node:14.18.0-alpine as prod
EXPOSE 4001
WORKDIR /app
COPY --from=build /app/build .
COPY package.json .
COPY yarn.lock .
RUN mkdir configs
RUN mkdir processors
RUN mkdir logs
VOLUME [ "/app/processors", "/app/logs", "/app/configs" ]
RUN yarn install --production
RUN ln -s /usr/bin/nodejs /usr/bin/node
CMD ["yarn", "prod"]
