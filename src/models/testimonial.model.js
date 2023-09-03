//External Lib Import
const mongoose = require('mongoose');

//Internal Lib Import
const { toJSON, paginate } = require('./plugins');

const testimonialSchema = mongoose.Schema(
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
    position: {
      type: String,
      maxLength: 300,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
testimonialSchema.plugin(toJSON);
testimonialSchema.plugin(paginate);

/**
 * @typedef Testimonial
 */
const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
