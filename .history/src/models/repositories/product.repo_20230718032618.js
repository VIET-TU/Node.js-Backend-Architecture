"use strict";

const { product } = require("../product.model");

const findAllDraftsForShop = async ({ query, limit, skip }) => {
  return await product.find({ query });
};

module.exports = {
  findAllDraftsForShop,
};
