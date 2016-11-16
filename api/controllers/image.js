'use strict';

const models = require('../../models');
const controllerize = require('../helpers/controllerize');
const Image = models.Image;

module.exports = controllerize({
  image_list: list,
  image_get: get,
  image_create: create,
  image_put: put,
});

function list(req, res) {
  const offset = req.swagger.params.page.value * (req.swagger.params.size.value || 25);
  return Image.findAndCountAll({
    where: { comicId: req.swagger.params.comic.value },
    limit: req.swagger.params.size.value,
    offset,
  });
}

function get(req, res) {
  return Image
    .findById(req.swagger.params.id.value);
}

function create(req, res) {
  return Image
    .create(req.body)
    .tap( () => res.status(201) );
}

function put(req, res) {
  return Image
    .findById(req.swagger.params.id.value)
    .then(inst => inst.update(req.body));
}
