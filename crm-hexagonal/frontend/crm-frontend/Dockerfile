# FROM node:20

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"]

