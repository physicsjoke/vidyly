FROM node:20-bullseye

WORKDIR /backend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN npx prisma generate
RUN npx prisma migrate reset -y
CMD npm run start
