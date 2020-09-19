const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  group_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  competition_id: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  logo: {
    type: String,
    required: true
  },
  backgroundColor: {
    type: String,
  },
  borderColor: {
    type: String
  },
  heroColor: {
    type: String,
  },
}, {
  timestamps: true,
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;