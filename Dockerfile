FROM node:16.3.0-alpine3.15

RUN mkdir -p /code/sst
WORKDIR /code/sst

# Install nodejs modules for sst app
COPY sst/package.json sst/package-lock.json /code/sst
RUN npm install

WORKDIR /code

ENTRYPOINT "/bin/sh"
