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

      return token ? token.publicKey : null;
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

  static removeKeyById = async (id) => {
    return await keytokenModel.find({ _id: id }).deleteOne().lean();
  };

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await keytokenModel
      .findOne({ refreshTokensUsed: refreshToken })
      .lean();
  };

  static deleteKeyById = async (userId) => {
    return await keytokenModel.findOne({ user: userId });
  };

  static findByRefreshToken = async (refreshToken) => {
    return await keytokenModel.findOne({ refreshToken });
  };
  static updateRefreshToken = async ({
    userId,
    refreshToken,
    refreshTokensUsed,
  }) => {
    return await keytokenModel.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          refreshToken,
        },
        $addToSet: {
          refreshTokensUsed, // da duoc sd de lay token moi roi
        },
      },
      { new: true }
    );
  };
}

module.exports = KeyTokenService;
