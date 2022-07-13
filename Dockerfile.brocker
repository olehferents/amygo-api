FROM node:lts-alpine
WORKDIR /microservice
COPY package*.json /microservice/
COPY tsconfig*.json /microservice/
RUN npm install && npm install -g @nestjs/cli
COPY . /microservice
CMD ["npm", "start", "redbrocker"]