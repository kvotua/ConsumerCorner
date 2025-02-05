FROM node:18

RUN mkdir /app
WORKDIR /app
COPY ./ /app
RUN npm install --legacy-peer-deps
EXPOSE 3000

CMD ["npm", "run", "dev"]
