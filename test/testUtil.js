'use strict';

const httpMocks = require('node-mocks-http');
const _ = require('lodash');

module.exports = {
  createHttpMockResponse,
  createHttpMockRequest,
  addSwaggerParamsToReq,
};

// Create a node-mocks-http.createResponse()
function createHttpMockResponse(options) {
  return httpMocks.createResponse(options);
}

// Create a node-mocks-http.createRequest()
function createHttpMockRequest(swaggerParams, options) {
  let req = httpMocks.createRequest(options);
  req = addSwaggerParamsToReq(req, swaggerParams);
  return req;
}

// Add parameters to the express request
function addSwaggerParamsToReq(req, swaggerParams) {
  const swagger = {
    params: swaggerParams || {},
  };
  return _.merge({ swagger }, req);
}
