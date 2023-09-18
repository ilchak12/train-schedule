FROM node:16
LABEL authors="Oleksandr"

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

RUN npm install

#COPY migrations ./migrations
COPY src ./src
COPY .env.dev ./
COPY .env ./

RUN npm run build

RUN #npm run typeorm
RUN #npm run typeorm:run