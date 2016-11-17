'use strict';

const models = require('../../models');
const controllerize = require('../helpers/controllerize');
const Image = models.Image;

module.exports = controllerize({
  image_list: list,
});

function list(req, res) {
  const pageSize = (req.swagger.params.size) ? req.swagger.params.size.value : 25;
  const offset = (req.swagger.params.page.value - 1) * pageSize;

  return Image.findAndCountAll({
    where: { comicId: req.swagger.params.comic.value },
    limit: pageSize,
    offset,
  });
}
