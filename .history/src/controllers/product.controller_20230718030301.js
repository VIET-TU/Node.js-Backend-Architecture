"use strict";

const { CREATED, SuccessResponse } = require("../core/success.reponse");
const productService = require("../services/product.service");

class ProductController {
  createProduct = async (req, res, next) => {
    console.log("req.body :>> ", req.body);
    new SuccessResponse({
      message: "Create new Product success",
      metadata: await productService.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };
  // QUERY
  /**
   * @desc Get all Draf for shop
   * @param {Number} limit
   * @param {String} product_shop
   * @return {JSON}
   */
  getAllDraftsForShop = async (req, res, next) => {
    console.log("req.body :>> ", req.body);
    new SuccessResponse({
      message: "Get list success",
      metadata: await productService.findAllDraftsForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };
}

module.exports = new ProductController();
