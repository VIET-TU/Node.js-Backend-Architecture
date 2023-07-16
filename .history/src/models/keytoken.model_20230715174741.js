"use strict";

const { Schema, model } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";

// Declare the Schema of the Mongo model
const KeyTokenSchame = new Schema(
  {
    name: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
    publicKey: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collation: COLLECTION_NAME,
  }
);

//Export the model
const shopModel = new model(DOCUMENT_NAME, KeyTokenSchame);

module.exports = shopModel;
