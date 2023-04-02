//External Lib Import
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

//Internal Lib Import
const { Task } = require('../models');
const { commonService } = require('.');

/**
 * @desc task create
 * @returns {Promise<Task>}
 */

const taskCreate = (request) => {
  const { userID } = request.user;
  return new Task({ userID, ...request.body }).save();
};

/**
 * @desc task dropDown
 * @returns {Promise<[Task]>}
 */

const taskDropDown = (request) => {
  const { userID } = request.user;
  const matchQuery = {
    userID: ObjectId(userID),
  };

  const projection = {
    label: '$title',
    value: '$_id',
  };

  return commonService.findService(Task, matchQuery, projection);
};

/**
 * @desc task list
 * @returns {Promise<[Task]>}
 */

const taskList = (request) => {
  const { userID } = request.user;

  const matchQuery = {
    userID: ObjectId(userID),
  };

  const projection = {
    userID: 0,
  };

  return commonService.findService(Task, matchQuery, projection);
};

/**
 * @desc task details
 * @returns {Promise<Task>}
 */

const taskDetails = (request) => {
  const { userID } = request.user;

  const matchQuery = {
    userID: ObjectId(userID),
    _id: ObjectId(request.params.id),
  };

  const projection = {
    userID: 0,
  };

  return commonService.findOneService(Task, matchQuery, projection);
};

/**
 * @desc task update
 * @returns {Promise<Task>}
 */

const taskUpdate = (request) => {
  const { userID } = request.user;

  const matchQuery = {
    userID: ObjectId(userID),
    _id: ObjectId(request.params.id),
  };
  const errorMessage = request.t('task not found');
  return commonService.updateService(Task, matchQuery, request.body, errorMessage);
};

/**
 * @desc task delete
 * @returns {Promise<Task>}
 */

const taskDelete = (request) => {
  const { userID } = request.user;

  const matchQuery = {
    userID: ObjectId(userID),
    _id: ObjectId(request.params.id),
  };
  const errorMessage = request.t('task not found');
  return commonService.deleteService(Task, matchQuery, errorMessage);
};

module.exports = {
  taskCreate,
  taskDropDown,
  taskList,
  taskDetails,
  taskUpdate,
  taskDelete,
};
