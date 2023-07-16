"use strict";

const crypto = require("crypto");

const bcrypt = require("bcrypt");

const KeyTokenService = require("./key.service");
const { createTokenPair } = require("../auth/authUtils");
const shopModel = require("../models/shop.model");
const { getInfoData } = require("../utils");

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
      console.log("hello world");
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

      // console.log("newshop  :>> ", newshop);

      if (newShop) {
        // created privateKey, publicKey
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1", // public key cryptography standards 1
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1", // public key cryptography standards 1
        //     format: "pem",
        //   },
        // });

        const privateKey = crypto.getRandomValues(64).toString("hex");
        const publicKey = crypto.getRandomValues(64).toString("hex");

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });

        if (!keyStore) {
          return {
            code: "xxxx",
            message: "keyStore error",
          };
        }

        // created token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey
        );
        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fileds: ["_id", "name", "email"],
              object: newShop,
            }),
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(500).json({
        code: "xxx",
        message: error.message,
        status: "error",
      });
    }
  };
}

module.exports = AccessService;
