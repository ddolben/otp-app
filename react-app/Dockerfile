FROM node:17.6.0-alpine3.15

RUN mkdir /code
COPY package.json package-lock.json /code/
WORKDIR /code

RUN npm install

ENTRYPOINT '/bin/sh'
