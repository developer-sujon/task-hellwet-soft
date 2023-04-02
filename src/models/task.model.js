//External Lib Import
const mongoose = require('mongoose');

//Internal Lib Import
const { toJSON, paginate } = require('./plugins');

const taskSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['new', 'pending', 'canceled', 'complete'],
      default: 'new',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

/**
 * @typedef Task
 */
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
