FROM node:10.16.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY data ./data

COPY .babelrc swagger.yaml ./

COPY src ./src

EXPOSE 4001

CMD ["npm", "start"]