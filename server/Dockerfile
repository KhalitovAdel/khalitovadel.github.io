ARG ENDPOINT_DATABASE
ARG NODE_IMAGE_VERSION=14-alpine
ARG APP_PATH=./server

FROM node:${NODE_IMAGE_VERSION} as install_dependency
ARG APP_PATH
WORKDIR /usr/src/app
RUN apk add --no-cache --virtual .gyp python make g++ git
COPY $APP_PATH/package*.json ./
COPY $APP_PATH/yarn.lock ./yarn.lock
RUN --mount=type=cache,target=/root/.cache/yarn yarn install --frozen-lockfile

FROM install_dependency as development
ARG APP_PATH
WORKDIR /usr/src/app
COPY $APP_PATH/ ./
COPY ./tsconfig.json /usr/src/tsconfig.json
EXPOSE 8080
CMD [ "npm", "start" ]

#FROM install_dependency as check_lint
#ARG APP_PATH
#WORKDIR /usr/src/app
#COPY $APP_PATH/ ./
#RUN npm run lint:check

#FROM install_dependency as migrate_database
#ARG APP_PATH
#ARG ENDPOINT_DATABASE
#ENV POSTGRES_CONNECTION_URL=$ENDPOINT_DATABASE
#WORKDIR /usr/src/app
#COPY $APP_PATH/ ./
#COPY ./tsconfig.json /usr/src/tsconfig.json
#RUN npm run migrate:latest

FROM install_dependency as build
ARG APP_PATH
WORKDIR /usr/src/app
COPY $APP_PATH/ ./
COPY ./tsconfig.json /usr/src/tsconfig.json
RUN yarn build

FROM node:${NODE_IMAGE_VERSION} as make_app
ARG APP_PATH
WORKDIR /usr/src/app
RUN apk add --no-cache --virtual .gyp python make g++
COPY --from=build /usr/src/app/dist ./dist
COPY ./tsconfig.json /usr/src/tsconfig.json
COPY $APP_PATH/package*.json ./
COPY $APP_PATH/yarn.lock ./yarn.lock
RUN --mount=type=cache,target=/root/.cache/yarn yarn install --prod --frozen-lockfile
EXPOSE 8080
CMD ["yarn", "start:prod"]
