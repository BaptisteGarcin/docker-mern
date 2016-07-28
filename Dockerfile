FROM node:latest
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev libkrb5-dev

RUN mkdir -p /srv/express-mongo

ADD ./package.json /srv/express-mongo/package.json
WORKDIR /srv/express-mongo

RUN npm install
ADD . /srv/express-mongo
