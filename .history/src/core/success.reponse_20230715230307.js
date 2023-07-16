"use strict";

const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode = {
  CREATED: "Created",
  Ok: "Scuccess",
};

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.OK,
    rasonStatusCode = ReasonStatusCode.Ok,
    metadata = {},
  }) {
    this.message = message || rasonStatusCode;
    this.status = statusCode;
    this.metadata = metadata;
  }
  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

class Ok extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class CREATED extends SuccessResponse {
  constructor({
    options = {},
    message,
    status = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    statusCode,
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
    this.options = options;
  }
}

module.exports = {
  Ok,
  CREATED,
};
