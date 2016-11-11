'use strict';

const _ = require('lodash');
const BPromise = require('bluebird');

module.exports = function controllerize(obj) {
  return _.mapValues(obj, (value, key) => {
    if (typeof value === 'function') {
      return wrap(value, obj);
    }
    return value;
  });
};

function wrap(method, obj) {
  return function(req, res, next) {
    try {
      const promise = BPromise.resolve( method.call(obj, req, res) );
      _.assign(res, { promise });
      next();
    }
    catch (err) {
      next(err);
    }
  };
}
