FROM node:16.3.0-alpine

# Install nodejs modules for sst app
RUN mkdir -p /code/sst
WORKDIR /code/sst
COPY sst/package.json sst/package-lock.json /code/sst
RUN npm install

# Install nodejs modules for React frontend
RUN mkdir -p /code/sst/frontend
WORKDIR /code/sst/frontend
COPY sst/frontend/package.json sst/frontend/package-lock.json /code/sst/frontend
RUN npm install

WORKDIR /code

ENTRYPOINT "/bin/sh"
