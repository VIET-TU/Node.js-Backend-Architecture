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
}
