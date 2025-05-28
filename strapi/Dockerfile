FROM node:22-alpine
# Installing libvips-dev for sharp Compatibility

WORKDIR /opt/
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN npm config set strict-ssl false

COPY package.json package-lock.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install
ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN ["npm", "run", "build"]
EXPOSE 1337
CMD ["npm", "run", "develop"]