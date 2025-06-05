const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
    meetingStartTime: {
      type: Date,
      required: true
    },
    meetingEndTime: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true,
  },
);

const Club = mongoose.model('Club', clubSchema);
module.exports = Club;
