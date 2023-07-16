"use strict";

const keytokenModel = require("../models/keytoken.model");
const { Types } = require("mongoose");

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

      return tokens ? token?.publicKey : null;
    } catch (error) {
      console.log("error :>> ", error);
      return error;
    }
  };

  static findbyUserId = async (userId) => {
    return await keytokenModel
      .findOne({ user: new Types.ObjectId(userId) })
      .lean();
  };

  static removeKeyById = async (userId) => {
    return await keytokenModel.remove(id);
  };
}

module.exports = KeyTokenService;
