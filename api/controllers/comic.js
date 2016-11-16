'use strict';

const models = require('../../models');
const controllerize = require('../helpers/controllerize');
const Comic = models.Comic;

module.exports = controllerize({
  comic_list: list,
  comic_get: get,
  comic_create: create,
  comic_put: put,
});

function list(req, res) {
  return Comic.findAll();
}

function get(req, res) {
  return Comic
    .findById(req.swagger.params.id.value);
}

function create(req, res) {
  return Comic
    .create(req.body)
    .tap( () => res.status(201) );
}

function put(req, res) {
  return Comic
    .findById(req.swagger.params.id.value)
    .then(inst => inst.update(req.body));
}
