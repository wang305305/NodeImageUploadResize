FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install --http-proxy=http://204.40.130.129:3128 --https-proxy=http://204.40.130.129:3128
COPY . /app
CMD npm start
EXPOSE 3000