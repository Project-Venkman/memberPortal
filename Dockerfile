FROM --platform=linux/amd64 node:18
WORKDIR /usr/src/app
#COPY package.json ./
COPY . .
ENV REACT_APP_MAGIC_KEY=pk_live_9D419FF14C48AEC6
EXPOSE 3000
RUN npm run build
CMD [ "npx", "serve", "-s", "build" ]