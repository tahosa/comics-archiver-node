'use strict';

const proxyquire = require('proxyquire');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const fs = require('fs-extra');
const Bluebird = require('bluebird');
const sinon = require('sinon');
chai.use(chaiAsPromised);

describe('crawler', () => {
  const instance = {
    title: 'some fake title',
    folder: 'testfolder',
    linkSelector: '.link',
    imgSelector: '.image',
    noteSelector: '.note',
    latest: 'http://example.com/latest',
    start: 'http://example.com/start',
    update: sinon.spy(() => Bluebird.resolve()),
    id: 1,
  };
  let Crawler;

  beforeEach(() => {
    Crawler = proxyquire('../../../lib/crawler',
      {
        requestPromise: stubRP(),
        request: stubRequest(),
        '../models': stubModels(),
      });
  });

  afterEach(() => {
    fs.remove('./testFolder');
  });

  it('should be constructed correctly', () => {
    const test = new Crawler(instance, '.');
    expect(test.instance).to.equal(instance);
    expect(fs.existsSync('./testFolder')).to.equal(true);
  });

  it('should be able to find by selector', () => {
    const test = new Crawler(instance, '.');
    expect(test.getNextUrl('<a class="link" href="/my/url"></a>').attr('href')).to.equal('/my/url');
    expect(test.getCurrentImage('<img class="image" src="/my/url"/>').attr('src')).to.equal('/my/url');
    expect(test.getNote('<p class="note">content here</p>').html()).to.equal('content here');
  });

  it('should not create the folder if it exists', () => {
    fs.mkdirSync('./testfolder');
    const fsStub = stubFs();
    Crawler = proxyquire('../../../lib/crawler',
      {
        fs: fsStub,
        requestPromise: stubRP(),
        request: stubRequest(),
        '../models': stubModels(),
      });

    const test = new Crawler(instance, '.');
    expect(test.instance).to.equal(instance);
    expect(fsStub.mkdirSync.called).to.equal(false);
  });

  describe('async operations', () => {
    const requestPromise = stubRP();
    const request = stubRequest();
    const models = stubModels();

    beforeEach(() => {
      Crawler = proxyquire('../../../lib/crawler',
        {
          'request-promise': requestPromise,
          request,
          '../models': models,
          './utils': { normalizeUrl() {
            return '';
          } },
        });
    });

    it('should download an image', () => {
      const test = new Crawler(instance, '.');
      test.download('http://example.com')
        .then(result => {
          expect(request.called).to.equal(true);
          expect(test.instance.update.called).to.equal(true);
          expect(models.Image.create.called).to.equal(true);
        });
    });

    it('should start crawling correctly', () => {
      const test = new Crawler(instance, '.');
      test.download = sinon.spy();
      test.crawl();
      expect(test.download.calledWith('http://example.com/latest')).to.equal(true);

      test.instance.latest = null;
      test.crawl();
      expect(test.download.calledWith('http://example.com/start')).to.equal(true);
    });
  });
});

function stubModels() {
  return {
    Comic: {},
    Image: {
      create: sinon.spy(),
    },
  };
}

function stubFs() {
  return {
    mkdirSync: sinon.spy(fs.mkdirSync),
  };
}

function stubRP() {
  return sinon.spy(function(url) {
    if (!url) {
      return Bluebird.resolve('');
    }

    return Bluebird.resolve(`<html>
    <head></head>
    <body>
      <a class="link" href="/my/url"></a>
      <img class="image" src="img.url"/>
      <img class="image" src="img2.url"/>
      <p class="note">content</p>
    </body>
    </html>`);
  });
}

function stubRequest() {
  return sinon.spy(function(url) {
    return {
      pipe(stream) {
        stream.close();
        fs.unlink(stream.path);
      },
    };
  });
}
