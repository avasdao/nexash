FROM node:18-alpine

ENV HOST='0.0.0.0'
ENV PORT='3000'

WORKDIR /webapp

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

# CMD ["node", "/webapp/.output/server/index.mjs"]
CMD ["node", "./cluster.js"]
