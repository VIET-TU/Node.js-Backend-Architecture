"use strict";

const crypto = require("crypto");

const bcrypt = require("bcrypt");
const shopModel = require("../models/shop.model");
const KeyTokenService = require("./key.service");
const { createTokenPair } = require("../auth/authUtils");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDIOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      const hodelShop = await shopModel.findOne({); // learn return object js
      console.log("hello world");
      if (hodelShop) {
        return {
          code: "xxxx",
          message: "Shop already registered",
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
}

module.exports = AccessService;
