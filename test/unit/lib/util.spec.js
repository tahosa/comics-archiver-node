'use strict';

const chai = require('chai');
const expect = chai.expect;
const utils = require('../../../lib/utils');

describe('utils', function() {
  it('should normalize URLs', function() {
    expect(utils.normalizeUrl('', 'http://example.com/my/path/here'))
      .to.equal('http://example.com/my/path/here');

    expect(utils.normalizeUrl('', 'https://example.com/my/path/here'))
      .to.equal('https://example.com/my/path/here');

    expect(utils.normalizeUrl('http://example.com', '/my/path/here'))
      .to.equal('http://example.com/my/path/here');

    expect(utils.normalizeUrl('http://example.com/', '/my/path/here'))
      .to.equal('http://example.com/my/path/here');

    expect(utils.normalizeUrl('http://example.com', 'my/path/here'))
      .to.equal('http://example.com/my/path/here');

    expect(utils.normalizeUrl('http://example.com/', 'my/path/here'))
      .to.equal('http://example.com/my/path/here');

    expect(utils.normalizeUrl('http://example.com/segment', 'my/path/here'))
      .to.equal('http://example.com/segment/my/path/here');

    expect(utils.normalizeUrl('http://example.com/segment/', 'my/path/here'))
      .to.equal('http://example.com/segment/my/path/here');

    expect(utils.normalizeUrl('http://example.com/segment', '../my/path/here'))
      .to.equal('http://example.com/my/path/here');

    expect(utils.normalizeUrl('http://example.com/segment/', '../my/path/here'))
      .to.equal('http://example.com/my/path/here');
  });

  it('should strip urls for the filename', function() {
    expect(utils.trimImageSrc('http://example.com/my/path/to/image.jpg'))
      .to.equal('image.jpg');

    expect(utils.trimImageSrc('/my/path/to/image.jpg'))
      .to.equal('image.jpg');

    expect(utils.trimImageSrc('my/path/to/image.jpg'))
        .to.equal('image.jpg');

    expect(utils.trimImageSrc('my/path/to/image.jpg?query=string'))
        .to.equal('image.jpg');
  });
});
