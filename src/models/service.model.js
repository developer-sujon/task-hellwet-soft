//External Lib Import
const mongoose = require('mongoose');

//Internal Lib Import
const { toJSON, paginate } = require('./plugins');

const serviceSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    avatar: {
      type: String,
      maxLength: 100,
      trim: true,
    },
    review: {
      type: String,
      maxLength: 500,
      trim: true,
    },
    url: {
      type: String,
      maxLength: 500,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
serviceSchema.plugin(toJSON);
serviceSchema.plugin(paginate);

/**
 * @typedef Service
 */
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
