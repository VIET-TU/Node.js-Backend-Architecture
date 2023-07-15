"use strict";

const mongoose = require("mongoose");

const connectString = `mongodb://localhost:27017/`;

// khởi tạo 1 connect
class Database {
  constructor() {
    this.connect();
  }

  // connect
  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString)
      .then((_) => console.log(`Connect Mongodb success Pro`))
      .catch((err) => console.log(`Error connect >> ${err}`));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = mongoose;