const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// init db
require("./dbs/init.mongodb");
// const { checkOverLoad } = require("./helpers/check.connect");
// checkOverLoad();

// init routes
app.use("/", require("./routes"));

// handling error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  return res.status(status).json({
    status: "error",
    code: status,

    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
