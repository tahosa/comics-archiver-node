'use strict';

/**
 * Common loading for chai use plugins
 * NOTE: order matters!  chai-as-promised should be loaded last
 * see: https://github.com/chaijs/chai-things/issues/4#issuecomment-87801365
 */
const chai = require('chai');
chai.use(require('chai-properties'));
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
