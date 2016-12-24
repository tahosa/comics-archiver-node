'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const Bluebird = require('bluebird');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const proxyquire = require('proxyquire').noCallThru();

describe('script - download', () => {

  describe('download', () => {

    let download;

    it('should register a working download function', () => {
      const crawlerStub = stubCrawler();
      download = proxyquire('../../../scripts/download', {
        '../models': stubModels(),
        '../lib/crawler': crawlerStub,
        '../config/env': stubEnv(),
      });
      const result = download.download({ name: 'comic1' });
      expect(result.constructorCalled).to.equal(true);
      expect(result.crawl.called).to.equal(true);
    });

    it('should work when using yargs instead of env', () => {
      const crawlerStub = stubCrawler();
      download = proxyquire('../../../scripts/download', {
        '../models': stubModels(),
        '../lib/crawler': crawlerStub,
        yargs: stubYargs(),
      });
      const result = download.download({ name: 'comic1' });
      expect(result.constructorCalled).to.equal(true);
      expect(result.crawl.called).to.equal(true);
    });

    it('should throw an error if a folder is not given', () => {
      download = proxyquire('../../../scripts/download', {
        '../models': stubModels(),
        '../lib/crawler': stubCrawler(),
      });
      expect(download.download.bind(null, { name: 'comic1' })).to.throw(Error);
    });
  });

  describe('downoadAll', () => {
    let download;

    it('should call download() multiple times', () => {
      download = proxyquire('../../../scripts/download', {
        '../models': stubModels(),
        '../lib/crawler': stubCrawler(),
        '../config/env': stubEnv(),
      });

      return expect(download.downloadAll()).to.eventually.have.length(2);
    });
  });
});

function stubModels() {
  return {
    Comic: {
      findAll() {
        return Bluebird.resolve(['comic1', 'comic2']);
      },
    },
  };
}

function stubCrawler() {
  return class Crawler {
    constructor(comic, folder) {
      this.constructorCalled = true;
      this.instance = comic;
      this.folder = folder;
      this.crawl = sinon.spy(() => this);
    }
  };
}

function stubEnv() {
  return {
    FOLDER: 'myfolder',
  };
}

function stubYargs() {
  return {
    argv: {
      folder: 'myfolder',
    },
  };
}
