"use strict";

require("dotenv").config();

// lv1

const dev = {
  app: {
    host: process.env.PORT,
  },
  db: {
    host: process.env.HOST,
    port: process.env.PORT,
    name: "db",
  },
};

const prod = {
  app: {
    host: process.env.PORT,
  },
  db: {
    host: process.env.HOST,
    port: process.env.PORT,
    name: "db",
  },
};

const config = { dev, prod };
const env = process.env.NODE_ENV || "dev";
module.exports = config[env];
