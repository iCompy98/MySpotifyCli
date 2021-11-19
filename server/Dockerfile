FROM node:12-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY server.js /app/

COPY .config.json /app/

CMD ["node", "server.js"]

