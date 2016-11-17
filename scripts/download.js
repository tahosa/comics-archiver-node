'use strict';

const models = require('../models');
const Crawler = require('../lib/crawler');
const Bluebird = require('bluebird');
const yargs = require('yargs').argv;
const env = require('../config/env');

module.exports = {
  downloadAll,
  download,
};

function downloadAll() {
  return models.Comic
    .findAll()
    .then(comics => Bluebird.map(comics, comic => download(comic)));
}

function download(comic) {
  if (!yargs.folder && !env.FOLDER) {
    throw new Error('No folder to download specified. Use the --folder argument or set the FOLDER variable.');
  }
  const crawler = new Crawler(comic, yargs.folder || env.FOLDER);
  return crawler.crawl();
}

// only execute if not require()ed
if (require.main === module) {
  downloadAll();
}
