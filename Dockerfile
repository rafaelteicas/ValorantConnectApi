FROM node:alpine
WORKDIR /usr/app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --silent
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
