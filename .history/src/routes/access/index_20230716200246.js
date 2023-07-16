"use strict";

const { authentacation } = require("../../auth/authUtils");
const accessController = require("../../controllers/access.controller");
const asyncHandler = require("../../helpers/asyncHandler");

const router = require("express").Router();

// signUp
router.post("/shop/signup", asyncHandler(accessController.signUp));

// signin
router.post("/shop/login", asyncHandler(accessController.login));

// authentication
router.use(authentacation);

// authentication
// router.post("/shop/logout", asyncHandler(accessController.logout));

module.exports = router;
