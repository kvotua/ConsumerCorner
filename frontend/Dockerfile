FROM node:18-alpine as BUILD_IMAGE
WORKDIR /app/react-app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]