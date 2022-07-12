FROM node:lts-buster-slim

WORKDIR /app

COPY . /app/

RUN npm install
RUN npx tailwindcss init
