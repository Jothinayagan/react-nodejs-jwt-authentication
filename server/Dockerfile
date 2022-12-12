FROM node:16

RUN mkdir -p /usr/src/node-server-network && chown -R node:node /usr/src/node-server-network

WORKDIR /usr/src/node-server-network

COPY package*.json ./

USER node

# Bundle app source
COPY --chown=node:node . .

RUN npm install 

EXPOSE 3005