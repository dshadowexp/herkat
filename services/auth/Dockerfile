FROM node:20.5.0
RUN apt-get update & \
    apt-get install --yes python3
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "start"]