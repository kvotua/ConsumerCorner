FROM node:19-alpine

WORKDIR /deploy

COPY ./ ./
RUN npm install

CMD ["node", "./deploy.js"]
