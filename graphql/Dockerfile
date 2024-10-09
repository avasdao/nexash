FROM node:22-slim

ENV HOST='0.0.0.0'
ENV PORT='6000'

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 6000

# CMD ["node", "/app/server.js"]
CMD ["node", "./cluster.js"]
