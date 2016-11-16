'use strict';

const models = require('../models');
const utils = require('./utils');
const requestPromise = require('request-promise');
const request = require('request');
const cheerio = require('cheerio');
const BPromise = require('bluebird');
const fs = require('fs');
const path = require('path');
const debug = require('debug')('comics-archiver:crawler');

class Crawler {
  constructor(comic, root) {
    this.instance = comic;
    this.fsRoot = path.join(root, this.instance.folder);
    if (!fs.existsSync(this.fsRoot)) {
      fs.mkdirSync(this.fsRoot);
    }
    debug(`Created new Crawler for ${this.instance.title}`);
  }

  getNextUrl(html) {
    return cheerio(this.instance.linkSelector, html);
  }

  getCurrentImage(html) {
    return cheerio(this.instance.imgSelector, html);
  }

  getNote(html) {
    return cheerio(this.instance.noteSelector, html);
  }

  download(url) {
    return requestPromise(url)
      .then( html => {
        debug(`Fetched ${url}. Downloading images and searching for next page.`);

        const nextTag = this.getNextUrl(html);
        const promises = [];

        const imgTag = this.getCurrentImage(html);
        debug(`Found ${imgTag.length} images`);

        imgTag.each((i, elem) => {
          const e = cheerio(elem);
          const imgPath = `${this.fsRoot}/${utils.trimImageSrc(e.attr('src'))}`;
          let annotation;

          // Save the image
          request(utils.normalizeUrl(url, e.attr('src')))
            .pipe(fs.createWriteStream(imgPath));

          if (i === imgTag.length - 1) {
            annotation = this.getNote(html).html();
          }

          // Persist the image to the database
          promises.push(models.Image
            .create({
              fileName: imgPath,
              altText: e.attr('title'),
              annotation,
              ComicId: this.instance.id,
            }, {
              include: [models.Comic],
            })
          );
        });

        debug(`Attempting next with ${nextTag.attr('href')}`);
        // Get the link for the next page
        if (nextTag.attr('href')) {
          this.instance
            .update({ latest: url })
            .then( () => {
              promises.push(this.download(utils.normalizeUrl(url, nextTag.attr('href'))));
            });
        }

        return BPromise.all(promises);
      });
  }

  crawl() {
    const startUrl = this.instance.latest || this.instance.start;

    debug(`Starting crawl from ${startUrl}`);
    return this.download(startUrl);
  }
}

module.exports = Crawler;
