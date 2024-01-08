FROM node:slim as base

RUN apt-get -y update

FROM base as build

WORKDIR /home/node/library

COPY --link package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM base AS test-js

WORKDIR /home/node/library

COPY --from=build /home/node/library /home/node/library

RUN npm link

WORKDIR /home/node/app

RUN npm link @khesse-project/express-maker-cli

RUN express-maker-cli init -t api-js

RUN npm install express dotenv cors

RUN npm install --save-dev nodemon jest supertest

ENTRYPOINT ["npx", "jest"]

FROM base as test-ts

WORKDIR /home/node/library

COPY --from=build /home/node/library /home/node/library

RUN npm link

WORKDIR /home/node/app

RUN npm link @khesse-project/express-maker-cli

RUN express-maker-cli init -t api-ts

RUN npm install express dotenv cors

RUN npm install --save-dev nodemon jest supertest

RUN npm install --save-dev @types/node @types/express ts-node typescript @types/cors @types/jest @types/supertest ts-jest \
    && npx tsc --init \
    && npx ts-jest config:init

ENTRYPOINT ["npx", "jest"]