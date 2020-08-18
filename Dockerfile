FROM node:12

WORKDIR /usr/app

ENV MONGO_URL mongodb://mongo:27017/caixa-virtual-api

COPY . .

RUN npm install

RUN npx tsc -p tsconfig-build.json

RUN npm prune --production

EXPOSE 5050

CMD ["npm", "start"]
