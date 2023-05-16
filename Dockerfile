FROM --platform=linux/amd64 node:18
WORKDIR /usr/src/app
COPY . .
##COPY package.json ./
##RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "npx", "run", "start:prod" ]
