"use strict";

const _ = require("lodash");

const getInfoData = ({ fileds = [], object = {} }) => {
  return _.pick(object, fileds);
};

// ['a', 'b'] = {a: 1, b: 1}
const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};

module.exports = {
  getInfoData,
  getSelectData,
};