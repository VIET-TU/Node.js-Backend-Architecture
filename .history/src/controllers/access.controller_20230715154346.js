"use strict";

class AccessController {
  signUP = async (req, res, next) => {
    try {
      console.log("req.body :>> ", req.body);
      return;
    } catch (error) {}
  };
}

module.exports = new AccessController();
