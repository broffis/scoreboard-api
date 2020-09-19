const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoringEventSchema = new Schema({
  player_id: {
    type: String,
    required: true,
  },
  group_id: {
    type: String,
    required: true,
  },
  event_id: {
    type: String,
    required: true,
  },
  competition_id: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  created_by_user_id: {
    type: String,
    // required: true,
  }
}, {
  timestamps: true,
});

const Score = mongoose.model('Score', scoringEventSchema);

module.exports = Score;
