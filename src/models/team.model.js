//External Lib Import
const mongoose = require('mongoose');

//Internal Lib Import
const { toJSON, paginate } = require('./plugins');

const teamSchema = mongoose.Schema(
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
      required: true,
    },
    position: {
      type: String,
      maxLength: 50,
      trim: true,
      required: true,
    },
    avatar: {
      type: String,
      maxLength: 100,
      trim: true,
    },
    type: {
      type: String,
      enum: ['DEVELOPER', 'SALE', 'SALE_SUPPORT'],
      required: true,
    },
    socialLink: [
      {
        label: {
          type: String,
          trim: true,
          maxLength: 50,
        },
        url: {
          type: String,
          trim: true,
          maxLength: 50,
        },
        icon: {
          type: String,
          trim: true,
          maxLength: 50,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
teamSchema.plugin(toJSON);
teamSchema.plugin(paginate);

/**
 * @typedef Team
 */
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
