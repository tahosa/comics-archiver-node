'use strict';

const path = require('path');

module.exports = {
  trimImageSrc(url) {
    return url.replace(/^.*\/([^\/\?]*)[^\/]*$/, '$1');
  },
  normalizeUrl(url, href) {
    if (href.match(/^http/)) {
      return href;
    }

    const root = url.replace(/^(https?:\/\/[^\/]*).*$/, '$1');
    if (href.match(/^\//)) {
      return `${root}${href}`;
    }

    const relative = url.replace(/^https?:\/\/[^\/]*\/?(.*$)/, '$1');

    return `${root}/${path.normalize(path.join(relative, href))}`;
  },
};
