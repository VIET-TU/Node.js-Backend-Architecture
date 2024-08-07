"use strict";

const { authentacationV2 } = require("../../auth/authUtils");
const accessController = require("../../controllers/access.controller");
const asyncHandler = require("../../helpers/asyncHandler");

const router = require("express").Router();

// signUp
router.post("/shop/signup", asyncHandler(accessController.signUp));

// signin
router.post("/shop/login", asyncHandler(accessController.login));

// authentication
router.use(authentacationV2);

// authentication
router.post("/shop/logout", asyncHandler(accessController.logout));

router.post(
  "/shop/handlerRefreshToken",
  asyncHandler(accessController.handlerRefreshTokenV2)
);

module.exports = router;
