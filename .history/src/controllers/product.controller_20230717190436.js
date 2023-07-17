"use strict";

const { CREATED, SuccessResponse } = require("../core/success.reponse");
const productService = require("../services/product.service");

class ProductController {
  createProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Get token success",
      metadata: await AccessService.handlerRefreshToken(req.body.refreshToken),
    }).send(res);
  };
}

module.exports = new ProductController();
