FROM node:22-alpine

WORKDIR /opt/
COPY package.json package-lock.json ./
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN npm config set strict-ssl false
# RUN npm config set cafile ${CERT_FILE_PATH}
# RUN npm config set proxy ${http_proxy}
# RUN npm config set https-proxy ${http_proxy}
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install
ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN ["npm", "run", "build"]
EXPOSE 1337
CMD ["npm", "run", "dev"]