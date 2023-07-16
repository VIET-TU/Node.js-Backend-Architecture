"use strict";

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    // lv 0
    try {
      // const keyToken = await keytokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey,
      // });
      // return token ? keyToken : null;

      // lelve xxx

      console.log("useId :>> ", userId);
      const filter = { user: userId },
        update = {
          publicKey,
          privateKey,
          refreshTokensUsed: [],
          refreshToken,
        },
        option = { upsert: true, new: true };
      const token = await keytokenModel.findOneAndUpdate(
        filter,
        update,
        option
      );

      return tokens ? token.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
