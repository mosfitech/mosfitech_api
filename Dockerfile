# FROM node:alpine

# RUN apk update && apk add ca-certificates openssl && update-ca-certificates

# RUN mkdir /app
# ADD . /app
# WORKDIR /app

# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
# RUN chmod +x /wait

# RUN npm install
# CMD /wait && npm start

FROM node:alpine

WORKDIR /usr/app

COPY ./package.json ./

RUN npm install 

COPY ./ ./

CMD ["yarn", "start"]