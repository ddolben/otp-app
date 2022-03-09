#FROM --platform=linux/amd64 ubuntu:20.04
FROM node:17.6.0-alpine3.15

#RUN apt-get update && apt-get install -y curl xz-utils

#WORKDIR /tmp

# Install nodejs (note that we're specifying the x86_64 verison for now)
#RUN curl -O https://nodejs.org/dist/v16.14.0/node-v16.14.0-linux-x64.tar.xz && \
#  mkdir -p /usr/local/lib/nodejs && \
#  tar -xf /tmp/node-v16.14.0-linux-x64.tar.xz -C /usr/local/lib/nodejs && \
#  ln -s /usr/local/lib/nodejs/node-v16.14.0-linux-x64/bin/node /usr/bin/node && \
#  ln -s /usr/local/lib/nodejs/node-v16.14.0-linux-x64/bin/npm /usr/bin/npm && \
#  ln -s /usr/local/lib/nodejs/node-v16.14.0-linux-x64/bin/npx /usr/bin/npx

RUN mkdir /code
COPY package.json package-lock.json /code/
WORKDIR /code

RUN npm install

ENTRYPOINT '/bin/sh'
