FROM node:18

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g nodemon  # Install nodemon globally

COPY . .

EXPOSE 4000
CMD ["nodemon", "server.js"]