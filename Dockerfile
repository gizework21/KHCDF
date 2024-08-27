FROM node:18.15

WORKDIR /app
COPY package*.json ./
COPY . .

RUN npm ci

CMD ["npm", "start"]
