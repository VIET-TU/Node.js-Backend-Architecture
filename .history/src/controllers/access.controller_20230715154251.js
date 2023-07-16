"use strict";

class AccessController {
  signUP = async (req, res, next) => {
    try {
      console.log("req.body :>> ", req.body);
    } catch (error) {}
  };
}

module.exports = new AccessController();
