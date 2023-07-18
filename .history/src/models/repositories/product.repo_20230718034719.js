"use strict";

const { product } = require("../product.model");

const findAllDraftsForShop = async ({ query, limit, skip }) => {
  return await product.find({ query }).lean();
};

module.exports = {
  findAllDraftsForShop,
};

db.Products.find({ product_shop: ObjectId("64b2c462d4dd5c9ab2abb0fd") });
db.Products.find({ product_shop: ObjectId("64b2c462d4dd5c9ab2abb0fd") });

db.Products.find({
  product_shop: ObjectId("64b2c462d4dd5c9ab2abb0fd"),
  isDraft: true,
});
