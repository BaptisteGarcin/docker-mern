FROM node:latest
RUN apt-get update -qq \
  && apt-get install -y build-essential libpq-dev libkrb5-dev \
  && useradd -g  www-data node --create-home

ADD ./package.json /srv/express-mongo/package.json
WORKDIR /srv/express-mongo

RUN chown -R node:www-data /usr/local /srv/express-mongo
USER node

RUN set -xe && npm install nodemon webpack -g && npm install

EXPOSE 3000
