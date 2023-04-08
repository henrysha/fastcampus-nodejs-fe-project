FROM node:lts-buster
LABEL author Seong Wook Ha <swh0901@gmail.com>

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4000
CMD npm run start

