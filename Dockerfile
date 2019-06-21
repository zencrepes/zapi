FROM node:12-alpine
WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE 5000
CMD [ "npm", "run", "start:prod"]
