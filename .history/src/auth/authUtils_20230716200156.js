"use strict";

const JWT = require("jsonwebtoken");
const asyncHandler = require("../helpers/asyncHandler");
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const { findbyUserId } = require("../services/key.service");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORZATION: "authorzation",
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // accessToken
    const accessToken = await JWT.sign(payload, publicKey, {
      // algorithm: "RS256",
      expiresIn: "2d",
    });

    // refreshToken
    const refreshToken = await JWT.sign(payload, privateKey, {
      // algorithm: "RS256",
      expiresIn: "2d",
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("error :>> ", error);
  }
};

const authentacation = asyncHandler(async (req, res, next) => {
  /**
   * 1 - Check userId missing ???
   * 2 - get accessToken
   * 3 - verifyToken
   * 4 - check user in bds
   * 5 - check keyStore with this userId
   * 6 - Ok all then return next()
   */

  //1
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid request");
  // 2
  const keyStore = await findbyUserId(userId);
  if (!keyStore) throw new NotFoundError("Not found keyStore");
  // 3
  const accessToken = req.headers[HEADER.AUTHORZATION];
  if (!accessToken) throw new AuthFailureError("Invalid request");
  try {
    const decodedUser = await JWT.verify(accessToken, keyStore.publicKey);
    if (userId !== decodedUser.userId)
      throw new AuthFailureError("Invaild userId");
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createTokenPair,
  authentacation,
};
