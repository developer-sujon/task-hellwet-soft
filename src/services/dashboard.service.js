//External Lib Import
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

//Internal Lib Import
const { Task } = require('../models');
const { commonService } = require('.');

/**
 * @desc dashboard summary
 * @returns {Promise<[Task]>}
 */

const dashboardSummary = (request) => {
  const { userID } = request.user;

  const matchQuery = {
    $match: { userID: ObjectId(userID) },
  };

  const groupBy = {
    $group: {
      _id: '$status',
      count: { $count: {} },
    },
  };

  return commonService.groupService(Task, matchQuery, groupBy);
};

module.exports = {
  dashboardSummary,
};
