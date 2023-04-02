//External Lib Import
const httpStatus = require('http-status');

//Internal Lib Import
const ApiError = require('../utils/ApiError');

const createUniqueService = async (dataModel, uniqueValue, uniqueErorMessage, postBody) => {
  const uniqueData = await dataModel.findOne(uniqueValue);

  if (uniqueData && Object.entries(uniqueData).length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, uniqueErorMessage);
  }
  return await new dataModel(postBody).save();
};

const groupService = async (dataModel, matchQuery, groupBy) => {
  return await dataModel.aggregate([matchQuery, groupBy]);
};

const listService = async (dataModel, matchQuery, projection, sort) => {
  sort = sort || {
    $sort: {
      _id: -1,
    },
  };
  return await dataModel.aggregate([matchQuery, projection, sort]);
};

const findService = (dataModel, matchQuery, projection, sort) => {
  sort = sort || {
    _id: -1,
  };
  return dataModel.find(matchQuery).select(projection).sort(sort);
};

const findOneService = (dataModel, matchQuery, projection) => {
  return dataModel.findOne(matchQuery).select(projection);
};

const detailsJoinService = async (dataModel, matchQuery, joinStage, projection, replaceProperty) => {
  if (replaceProperty) {
    return await dataModel.aggregate([matchQuery, joinStage, replaceProperty, projection]);
  }
  return await dataModel.aggregate([matchQuery, joinStage, projection]);
};

const updateService = async (dataModel, matchQuery, postBody, notFoundErrorMessage) => {
  const data = await dataModel.findOne(matchQuery);
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, notFoundErrorMessage);
  }
  Object.assign(data, postBody);
  return await data.save();
};

const deleteService = async (dataModel, matchQuery, notFoundErrorMessage) => {
  const data = await dataModel.findOne(matchQuery);
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, notFoundErrorMessage);
  }
  await dataModel.deleteMany(matchQuery);
  return data;
};

module.exports = {
  createUniqueService,
  groupService,
  listService,
  findService,
  findOneService,
  detailsJoinService,
  updateService,
  deleteService,
};
