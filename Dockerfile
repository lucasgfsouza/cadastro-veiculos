FROM node:22

WORKDIR /app

copy package*.json ./

RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]