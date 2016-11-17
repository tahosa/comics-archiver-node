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
let comicController;

describe('image controller', function() {

  beforeEach( () => {
    comicController = proxyquire('../../../../api/controllers/comic', {
      '../../models': stubModels(),
    });
    req = testUtil.createHttpMockRequest();
    res = testUtil.createHttpMockResponse();
    next = sinon.spy();
  });

  describe('list', function() {
    it('should return the list of comics', function() {
      comicController.comic_list(req, res, next);

      return expect(res.promise).to.eventually.deep.equal(['comic1', 'comic2']);
    });
  });

  describe('get', function() {
    it('should return the comic with the given id', function() {
      req = testUtil.createHttpMockRequest({ id: { value: 1 } });
      comicController.comic_get(req, res, next);

      return Bluebird.all([
        expect(res.promise).to.eventually.have.property('name', 'comic1'),
        expect(res.promise).to.eventually.have.property('id', 1),
      ]);
    });
  });

  describe('create', function() {
    it('should return the list of comics', function() {
      req.body = { data0: 0, data1: 1 };
      comicController.comic_create(req, res, next);

      return Bluebird.all([
        expect(res.promise).to.eventually.deep.equal({ name: 'comic1', data: { data0: 0, data1: 1 } }),
      ]);
    });
  });

  describe('bulkCreate', function() {
    it('should return the list of comics', function() {
      req.body = [{ data0: 0, data1: 1 }, { data2: 2, data3: 3 }];
      comicController.comic_bulkCreate(req, res, next);

      return Bluebird.all([
        expect(res.promise).to.eventually.have.length(2),
      ]);
    });
  });

  describe('put', function() {
    it('should return the list of comics', function() {
      req = testUtil.createHttpMockRequest({ id: { value: 1 } });
      req.body = { data4: 4 };
      comicController.comic_put(req, res, next);

      return Bluebird.all([
        expect(res.promise).to.eventually.have.property('data4', 4),
      ]);
    });
  });
});

function stubModels() {
  const modelsStub = {
    Comic: {
      findAll() {
        return Bluebird.resolve(['comic1', 'comic2']);
      },
      create(data) {
        return Bluebird.resolve({ name: 'comic1', data });
      },
      findById(id) {
        return Bluebird.resolve({
          name: 'comic1',
          id,
          update(data) {
            return Bluebird.resolve(data);
          },
        });
      },
    },
  };
  return modelsStub;
}
