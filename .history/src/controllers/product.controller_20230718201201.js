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

  publishProductByshop = async (req, res, next) => {
    new SuccessResponse({
      message: "publishProductByshop success",
      metadata: await productService.publishProductByShop({
        product_id: req.params.id,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };
  unpublishProductByshop = async (req, res, next) => {
    new SuccessResponse({
      message: "unpublishProductByshop success",
      metadata: await productService.unpublishProductByShop({
        product_id: req.params.id,
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
    new SuccessResponse({
      message: "Get list drafts success",
      metadata: await productService.findAllDraftsForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  getAllPublishForShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list publishes success",
      metadata: await productService.findAllPublishForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  getListSearchProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list getListSearchProduct success",
      metadata: await productService.searchProduct(req.params),
    }).send(res);
  };

  findAllProducts = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list findAllProducts success",
      metadata: await productService.findAllProducts(req.query),
    }).send(res);
  };

  findProduct = async (req, res, next) => {
    console.log("req.params.product_id :>> ", req.params.product_id);
    new SuccessResponse({
      message: "Get list findProduct success",
      metadata: await productService.findAllProducts({
        product_id: req.params.product_id,
      }),
    }).send(res);
  };

  // END QUERY
}

module.exports = new ProductController();
