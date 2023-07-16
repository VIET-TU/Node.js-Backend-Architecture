"use strict";

const crypto = require("crypto");

const bcrypt = require("bcrypt");

const KeyTokenService = require("./key.service");
const { createTokenPair } = require("../auth/authUtils");
const shopModel = require("../models/shop.model");
const { getInfoData } = require("../utils");
const {
  BadRequestError,
  AuthFailureErrors,
} = require("../core/error.response");

// service
const { findByEmail } = require("./shop.service");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDIOR",
  ADMIN: "ADMIN",
};

class AccessService {
  /**
   * 1 - check email in dbs
   * 2 - match password
   * 3 - create AT vs RT and save
   * 4 - generate tokesn
   * 5 - get data return login
   */

  static login = async ({ email, password, refreshToken = null }) => {
    //1
    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new BadRequestError("Shop not registered");
    //2
    const match = bcrypt.compare(password, foundShop.password);
    if (!match) throw new AuthFailureErrors("Authentication error");
    // 3
    // created privateKey, publicKey
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");
    //4
    const keyStore = await KeyTokenService.createKeyToken({
      userId: foundShop._id,
      publicKey,
      privateKey,
    });
    // 5
    return {
      metadata: {
        shop: getInfoData({
          fileds: ["_id", "name", "email"],
          object: foundShop,
        }),
        tokens,
      },
    };
  };

  static signUp = async ({ name, email, password }) => {
    const hodelShop = await shopModel.findOne({ email }).lean(); // learn return object js
    console.log("hello world");
    if (hodelShop) {
      throw new BadRequestError("Error: Shop already registered!");
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

      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

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
  };
}

module.exports = AccessService;
