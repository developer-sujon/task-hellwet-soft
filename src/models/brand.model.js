//External Lib Import
const mongoose = require('mongoose');

//Internal Lib Import
const { toJSON, paginate } = require('./plugins');

const footerSchema = mongoose.Schema(
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
    icon: {
      type: String,
      maxLength: 100,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
footerSchema.plugin(toJSON);
footerSchema.plugin(paginate);

/**
 * @typedef Footer
 */
const Footer = mongoose.model('Footer', footerSchema);

module.exports = Footer;
