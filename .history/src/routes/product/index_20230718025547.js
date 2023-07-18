"use strict";

const { authentacationV2 } = require("../../auth/authUtils");
const productController = require("../../controllers/product.controller");
const asyncHandler = require("../../helpers/asyncHandler");

const router = require("express").Router();

// authentication
router.use(authentacationV2);

/////////////////

router.post(
  "/shop/handlerRefreshToken",
  asyncHandler(productController.createProduct)
);

// QUERY
router.get("/drafts/all", asyncHandler(productController.getAllDraftsForShop));

module.exports = router;
