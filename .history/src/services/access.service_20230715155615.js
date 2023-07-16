"use strict";

const shopModel = require("../models/shop.model");

class AccessService {
  static signUp = async ({ name, email, password, role }) => {
    try {
      const hodelShop = await shopModel.findOne({ email }).lean(); // learn return object js
      if (hodelShop) {
        return {
          code: "xxxx",
          message: "Shop already registered",
        };
      }
      const newShop = await shopModel.create({
        name,
        email,
        password,
        role,
      });
    } catch (error) {}
  };
}

module.exports = AccessService;
