"use strict";

const { apiKey, permission } = require("../auth/checkAuth");

const router = require("express").Router();

// check apiKey
router.use(apiKey);
router.use(permission("0000"));

// check permission
router.use("/v1/api/product", require("./product"));
router.use("/v1/api", require("./access"));

module.exports = router;
