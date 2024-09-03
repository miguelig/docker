FROM node:20
WORKDIR /home/app



COPY . .

EXPOSE 3000

RUN npm install

CMD [ "node", "app.js" ]