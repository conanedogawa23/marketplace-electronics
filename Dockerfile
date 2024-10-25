FROM node:21-alpine AS base
WORKDIR /app
COPY . .
RUN npm install

EXPOSE 4000
CMD ["npm", "run", "dev"]