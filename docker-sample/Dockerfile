FROM node:lts-buster
LABEL author Seong Wook Ha <swh0901@gmail.com>

COPY . /usr/src/app

WORKDIR /usr/src/app
RUN npm ci

RUN npm run build

EXPOSE 3000
CMD npm run start

