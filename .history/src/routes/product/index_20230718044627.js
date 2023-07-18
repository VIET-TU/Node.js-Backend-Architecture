"use strict";

const { authentacationV2 } = require("../../auth/authUtils");
const productController = require("../../controllers/product.controller");
const asyncHandler = require("../../helpers/asyncHandler");

const router = require("express").Router();

// authentication
router.use(authentacationV2);

/////////////////

// Post
router.post(
  "/shop/handlerRefreshToken",
  asyncHandler(productController.createProduct)
);
router.post(
  "/publish/:id",
  asyncHandler(productController.publishProductByshop)
);

// Query
router.get("/drafts/all", asyncHandler(productController.getAllDraftsForShop));
router.get(
  "/published/all",
  asyncHandler(productController.getAllPublishForShop)
);

module.exports = router;
