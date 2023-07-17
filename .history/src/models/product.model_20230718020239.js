const { model, Schema } = require("mongoose");
const slugify = require("slugify");

const COLLECTION_NAME = "Products";
const COLLECTION_CLOTHING_NAME = "Clothings";
const COLLECTION_ELECTRON_NAME = "Electrons";
const COLLECTION_FURNITURE_NAME = "Furnitures";

const productSchema = new Schema(
  {
    product_name: {
      // quan jean cao cap
      type: String,
      trim: true,
      maxLength: 150,
    },
    product_thumb: {
      type: String,
      trim: true,
    },
    product_description: {
      type: String,
    },
    product_slug: String, // quan-jean-cao-cap
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
    // more
    // more
    product_ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be above 5.0"],
      // 4.3456666 => 4.3 - round ham lam tron len so thu nhat sau dau phay
      set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: {
      // kich thuoc, chat lieu, ram bao nhieu
      type: Array,
      default: [],
    },
    isDraft: {
      // nhap
      type: Boolean,
      default: true, // khong dk select ra
      index: true,
      select: false, // khong lay field nay ra
    },
    isPublished: {
      type: Boolean,
      default: false, // khong dk select ra
      index: true,
      select: false, // khong lay field nay ra
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

// Document middleware: runs before .save() and .create() ....

productSchema.pre("save", (next) => {
  console.log("this.product_name :>> ", productSchema);
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

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
