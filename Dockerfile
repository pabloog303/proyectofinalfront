FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173 8787

CMD ["npm", "run", "dev:full"]
