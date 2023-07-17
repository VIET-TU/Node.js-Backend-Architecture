"use strict";

const { BadRequestError } = require("../core/error.response");
const { product, clothing, electronic } = require("../models/product.model");

// define Factory class to create product
class ProductFactory {
  /**
   *  type: 'Clothing ',
   * payload
   */
  static async createProduct(type, payload) {
    switch (type) {
      case "Electronics":
        return new Electronic(payload).createProduct();
      case "Clothing":
        return new Clothing(payload).createProduct();
      default:
        throw new BadRequestError(`Invalid Product Types ${type}`);
    }
  }
}

// define base product class
class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quality,
    product_type,
    product_shop,
    product_attributes,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quality = product_quality;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes; // product_attributes lien quan quan ao, noi that, do dien tu (model con)
  }
  // create new product
  async createProduct() {
    return await product.create(this);
  }
}

// define sub-class for diffrent product types clothing
class Clothing extends Product {
  // overwirite
  async createProduct() {
    const newClothing = await clothing.create(this.product_attributes);
    if (!newClothing) throw new BadRequestError("Error create new Clothing");
    const newProduct = await super.createProduct();
    if (!newProduct) throw new BadRequestError("Error create new Product");
    return newProduct;
  }
}

// define sub-class for diffrent product types Electronics
class Electronic extends Product {
  async createProduct() {
    const newElectronic = await electronic.create(this.product_attributes);
    if (!newElectronic)
      throw new BadRequestError("Error create new Electronic");
    const newProduct = await super.createProduct();
    if (!newProduct) throw new BadRequestError("Error create new Product");
    return newProduct;
  }
}

module.exports = ProductFactory;
