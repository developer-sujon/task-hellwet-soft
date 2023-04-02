const Joi = require('joi');
const { objectId } = require('./custom.validation');

const taskCreate = {
  body: Joi.object().keys({
    title: Joi.string().min(3).max(30).required(),
    descriptions: Joi.string().required(),
    dueDate: Joi.date(),
    status: Joi.string().valid('new', 'pending', 'canceled', 'complete'),
  }),
};

const taskDetails = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const taskUpdate = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().min(3).max(30).required(),
    descriptions: Joi.string().required(),
    dueDate: Joi.date(),
    status: Joi.string().valid('new', 'pending', 'canceled', 'complete'),
  }),
};

const taskDelete = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  taskCreate,
  taskDetails,
  taskUpdate,
  taskDelete,
};
