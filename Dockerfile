FROM --platform=linux/amd64 node:18
WORKDIR /usr/src/app
COPY . .
RUN npm install
ENV REACT_APP_MAGIC_KEY=pk_live_9D419FF14C48AEC6
ENV GENERATE_SOURCEMAP=false
ENV REACT_APP_DEV=production
EXPOSE 3000
CMD [ "npx", "tailwindcss", "-i", "./src/styles/App.css", "-o", "./src/styles/output.css" ]
CMD [ "npm", "craco", "build" ]
CMD [ "npx", "serve", "-s", "build" ]
