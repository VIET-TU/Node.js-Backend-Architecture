"use strict";

const { default: mongoose } = require("mongoose");
const os = require("os");
const precess = require("process");

const _SECONDS = 5000;

// count connect
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections >>> ${numConnection}`);
};

// check over load
const checkOverLoad = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus.length; // ktr bn core trong cpu
    const memoryUse = precess.memoryUsage.rss; // memory used
    // Example maximum number of connection based on number of cors
    const maxConnections = numCors * 5; // moi core chiu dc 5 connect

    console.log("Active connections: :>> ", numConnection);
    console.log("Number of core :>> ", numCores);
    console.log("Memory usage :>> ", memoryUse / 1024 / 1024 + "MB");

    // kiem tra xem so connect co vuot qua so connect quy dinh
    if (numConnection > maxConnections) {
      console.log(`Connection overload deceted!`);
    }
  }, _SECONDS); // Monitor ever 5 seconds
};

module.exports = {
  countConnect,
  checkOverLoad,
};
