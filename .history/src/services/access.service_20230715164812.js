"use strict";

const crypto = require("crypto");

const bcrypt = require("bcrypt");
const shopModel = require("../models/shop.model");
const KeyTokenService = require("./key.service");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDIOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      const hodelShop = await shopModel.findOne({ email }).lean(); // learn return object js
      if (hodelShop) {
        return {
          code: "xxxx",
          message: "Shop already registered",
        };
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        role: [RoleShop.SHOP],
      });

      if (newShop) {
        // created privateKey, publicKey
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });

        if (!publicKeyString) {
          return {
            code: "xxxx",
            message: "publicKeyString error",
          };
        }
      }
    } catch (error) {}
  };
}

module.exports = AccessService;
