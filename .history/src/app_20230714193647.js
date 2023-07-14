const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
// init db

// init routes

// handling error

module.exports = app;
