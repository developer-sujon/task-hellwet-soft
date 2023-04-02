//External Lib Import
const httpStatus = require('http-status');

//Internal Lib Import
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services');
/**
 * @desc task create
 * @access private
 * @route /api/v1/task/taskCreate
 * @methud POST
 */

const taskCreate = catchAsync(async (req, res) => {
  const data = await taskService.taskCreate(req);
  res.status(httpStatus.CREATED).json({ status: true, message: 'task create successful', data });
});

/**
 * @desc task dropDown
 * @access private
 * @route /api/v1/task/taskdropDown
 * @methud GET
 */

const taskDropDown = catchAsync(async (req, res) => {
  const data = await taskService.taskDropDown(req);
  res.json({ status: true, message: null, data });
});

/**
 * @desc task list
 * @access private
 * @route /api/v1/task/taskList
 * @methud GET
 */

const taskList = catchAsync(async (req, res) => {
  const data = await taskService.taskList(req);
  res.json({ status: true, message: null, data });
});

/**
 * @desc task details
 * @access private
 * @route /api/v1/task/taskDetails/:id
 * @methud GET
 */

const taskDetails = catchAsync(async (req, res) => {
  const data = await taskService.taskDetails(req);
  res.json({ status: true, message: null, data });
});

/**
 * @desc task update
 * @access private
 * @route /api/v1/task/taskUpdate/:id
 * @methud PATCH
 */

const taskUpdate = catchAsync(async (req, res) => {
  const data = await taskService.taskUpdate(req);
  res.json({ status: true, message: 'task update successful', data });
});

/**
 * @desc task delete
 * @access private
 * @route /api/v1/task/taskDelete/:id
 * @methud DELETE
 */

const taskDelete = catchAsync(async (req, res) => {
  const data = await taskService.taskDelete(req);
  res.json({ status: true, message: 'task delete successful', data });
});

module.exports = {
  taskCreate,
  taskDropDown,
  taskList,
  taskDetails,
  taskUpdate,
  taskDelete,
};
