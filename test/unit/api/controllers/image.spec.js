'use strict';
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const Bluebird = require('bluebird');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const testUtil = require('../../../testUtil');
const proxyquire = require('proxyquire').noCallThru();

let req;
let res;
let next;
let imageController;

describe('image controller', () => {

  beforeEach( () => {
    imageController = proxyquire('../../../../api/controllers/image', {
      '../../models': stubModels(),
    });
    req = testUtil.createHttpMockRequest();
    res = testUtil.createHttpMockResponse();
    next = sinon.spy();
  });

  describe('list', () => {
    it('should return a page of images for a given comic', () => {
      req = testUtil.createHttpMockRequest({ comic: { value: 1 }, page: { value: 1 }, size: { value: 20 } });
      imageController.image_list(req, res, next);

      return expect(res.promise).to.eventually.deep.equal({ count: 20, rows: ['image1', 'image2'] });
    });

    it('should have a default page size', () => {
      req = testUtil.createHttpMockRequest({ comic: { value: 1 }, page: { value: 1 } });
      imageController.image_list(req, res, next);

      return expect(res.promise).to.eventually.deep.equal({ count: 25, rows: ['image1', 'image2'] });
    });
  });
});

function stubModels() {
  const modelsStub = {
    Image: {
      findAndCountAll: sinon.spy((options) =>
        Bluebird.resolve({ count: options.limit, rows: ['image1', 'image2'] })
      ),
    },
  };
  return modelsStub;
}
