const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";
const COLLECTION_CLOTHING_NAME = "Clothings";
const COLLECTION_ELECTRON_NAME = "Electrons";
const COLLECTION_FURNITURE_NAME = "Furnitures";

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    product_thumb: {
      type: String,
      unique: true,
      trim: true,
    },
    product_description: {
      type: String,
    },
    product_slug: String,
    product_price: {
      type: Number,
      required: true,
    },
    product_quality: {
      type: Number,
      required: true,
    },
    product_type: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothing", "Furniture"],
    },
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    product_attributes: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
