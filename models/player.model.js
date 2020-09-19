const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  country_id: {
    type: String,
    minlength: 6,
    trim: true,
    unique: true,
    required: true,
  },
  group_id: {
    type: String,
    minlength: 3,
    trim: true,
    required: true
  },
  competition_id: {
    type: String,
    minlength: 3,
    trim: true,
    required: true,
  }
}, {
  timestamps: true,
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
