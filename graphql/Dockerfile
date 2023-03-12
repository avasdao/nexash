FROM node:16-alpine

ENV HOST='0.0.0.0'
ENV PORT='3000'

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "/app/server.js"]
