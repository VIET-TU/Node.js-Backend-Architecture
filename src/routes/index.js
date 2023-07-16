"use strict";

const { apiKey, permission } = require("../auth/checkAuth");

const router = require("express").Router();

// check apiKey
router.use(apiKey);
router.use(permission("0000"));

// check permission
router.use("/v1/api", require("./access"));

// router.get("/", (req, res) => {
//   return res.status(200).json("hello world");
// });

module.exports = router;
