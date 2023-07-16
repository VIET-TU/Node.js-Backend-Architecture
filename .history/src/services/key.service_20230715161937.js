"use strict";

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createKeyToken = async ({ user, publicKey }) => {
    try {
      const publicKeyString = publicKey.toString();
      const token = await keytokenModel;
    } catch (error) {}
  };
}

module.exports = KeyTokenService;
