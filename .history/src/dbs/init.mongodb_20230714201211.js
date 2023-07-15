"use strict";

const mongoose = require("mongoose");

const connectString = `mongodb://localhost:27017/shopDEV`;

class Database {
  constructor() {
    this.connect();
  }

  // connect
  connect() {
    mongoose
      .connect(connectString)
      .then((_) => console.log(`Connect Mongodb success`))
      .catch((err) => console.log(`Error connect >> ${err}`));
  }
}

module.exports = mongoose;
