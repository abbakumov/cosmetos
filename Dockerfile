FROM node:10.16.3

# place in container to store application files
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install
# download specific npm package to run sharp on linux
RUN rm -rf node_modules/sharp
RUN npm install --arch=x64 --platform=linux --target=10.16.3 sharp

RUN npm run build

CMD ["npm", "start"]
