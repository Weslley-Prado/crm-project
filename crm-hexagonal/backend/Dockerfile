# FROM node:20

# WORKDIR /app/backend
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npx tsc
# CMD ["node", "dist/app.js"]

FROM node:20

WORKDIR /app/backend
COPY package*.json ./
RUN npm install
COPY . .
RUN npx tsc --diagnostics || (echo "TypeScript compilation failed"; exit 1)
CMD ["node", "dist/app.js"]

# FROM node:20

# WORKDIR /app/backend

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npm run build

# CMD ["node", "dist/app.js"]
