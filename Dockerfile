FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

RUN npx prisma generate

RUN npm run build

CMD [ "npm", "run", "start" ]
