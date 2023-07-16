"use strict";

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const keyToken = await keytokenModel.create({
        user: userId,
        publicKey,
        privateKey,
      });

      return token ? keyToken : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
