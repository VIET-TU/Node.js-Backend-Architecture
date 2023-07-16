"use strict";

const shopModel = require("../models/shop.model");

const findByEmail = async ({
  email,
  select = {
    email: 1,
    password: 1,
    name: 1,
    status: 1,
  },
}) => {
  return await shopModel.findOne({ email }).select(select).learn();
};

module.exports = {
  findByEmail,
};
