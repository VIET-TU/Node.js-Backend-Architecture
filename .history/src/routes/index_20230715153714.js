"use strict";

const router = require("express").Router();

router.get("/", (req, res) => {
  return res.status(200).json("hello world");
});

module.exports = router;
