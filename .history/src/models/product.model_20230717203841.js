const { model, Schema } = require("mongoose");

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
      type: Schema.Types.Mixed, // store data JSON
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const clothingSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: String,
    material: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  {
    collection: COLLECTION_CLOTHING_NAME,
    timestamps: true,
  }
);

const electronicsSchema = new Schema(
  {
    manufacturer: { type: String, required: true },
    model: String,
    color: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  {
    collection: COLLECTION_ELECTRON_NAME,
    timestamps: true,
  }
);

const furnitureSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: String,
    material: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  {
    collection: COLLECTION_FURNITURE_NAME,
    timestamps: true,
  }
);

module.exports = {
  product: model("Product", productSchema),
  electronic: model("Electronic", electronicsSchema),
  clothing: model("Clothing", clothingSchema),
  furniture: model("Furniture", furnitureSchema),
};
