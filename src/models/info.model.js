//External Lib Import
const mongoose = require('mongoose');

//Internal Lib Import
const { toJSON, paginate } = require('./plugins');

const infoSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    homeTitle: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    homeSubtitle: {
      type: String,
      maxLength: 300,
      trim: true,
    },
    homeLinkLabel: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    homeLink: {
      type: String,
      maxLength: 100,
      trim: true,
    },
    happyClients: {
      type: Number,
      maxLength: 50,
      trim: true,
    },
    products: {
      type: Number,
      maxLength: 50,
      trim: true,
    },
    yearsOfExperience: {
      type: Number,
      maxLength: 50,
      trim: true,
    },
    ourMissionVision: {
      type: String,
      maxLength: 500,
      trim: true,
    },
    ourMissionVisionLabel: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    ourMissionVisionLink: {
      type: String,
      maxLength: 100,
      trim: true,
    },
    ourMissionVisionVideo: {
      type: String,
      maxLength: 100,
      trim: true,
    },
    about: {
      type: String,
      maxLength: 500,
      trim: true,
    },
    aboutLabel: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    aboutDescription: {
      type: String,
      maxLength: 500,
      trim: true,
    },
    serviceLabel: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    serviceDescription: {
      type: String,
      maxLength: 500,
      trim: true,
    },
    teamLabel: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    teamDescription: {
      type: String,
      maxLength: 500,
      trim: true,
    },
    blogLabel: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    blogDescription: {
      type: String,
      maxLength: 500,
      trim: true,
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
    frequentlyAskedQuestions: [
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
    addresses: [
      {
        label: {
          type: String,
          maxLength: 50,
          trim: true,
        },
        address: {
          type: String,
          maxLength: 100,
          trim: true,
        },
        map: {
          type: String,
          maxLength: 500,
          trim: true,
        },
      },
    ],
    footerCredit: {
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
infoSchema.plugin(toJSON);
infoSchema.plugin(paginate);

/**
 * @typedef Info
 */
const Info = mongoose.model('Info', infoSchema);

module.exports = Info;
