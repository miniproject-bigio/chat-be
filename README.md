# Chat Web Backend

## Introduction

A Mini Project from BIGIO.ID that interacts between the server and client using [socket.io](https://socket.io/)

## Table of Contents

- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [How to Run](#how-to-run)
- [Libraries](#libraries)
- [Project Structure](#project-structure)

## How to Run

```bash
npm install
npm run dev
# or
yarn install
yarn dev
# or
pnpm install
pnpm dev
# or
bun install
bun dev
```

Port [http://localhost:3000](http://localhost:3000) for the socket.io to interact with backend and frontend.

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `app.js`. The page auto-updates as you edit the file.

## Libraries

- express
- cors
- bcryptjs
- dotenv
- express-vaildator
- jsonwebtoken
- nodemon
- pg
- sequelize
- socket.io
- uuid

## Project Structure

```basb
──src
  ├───config
  │   ├───db.config.js
  │   └───token.config.js
  ├───controllers
  │   ├───auth.controller.js
  │   ├───message.controller.js
  │   └───user.controller.js
  ├───middlewares
  │   └───middleware.js
  ├───routes
  │   └───routes.js
  ├───schemes
  │   ├───message.model.js
  │   ├───refresh-token.model.js
  │   ├───token.model.js
  │   └───user.model.js
  └──README.md

```

## Contributors

[rizkyhaksono](https://github.com/rizkyhaksono)

## LICENSE

[MIT LICENSE](./LICENSE)
