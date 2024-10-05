FROM node:20-alpine
ENV NODE_ENV prod
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 8008
CMD [ "npm", "run", "start" ]