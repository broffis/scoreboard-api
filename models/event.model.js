const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  event_name: {
    type: String,
    required: true,
    unique: true,
  },
  available_points: {
    type: Array,
    required: true,
  },
  competitions_used: {
    type: Array
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
