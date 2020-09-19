const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const competitionSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3
  },
  date: { type: Date, required: true },
  logo: { type: String }
}, {
  timestamps: true
});

const Competition = mongoose.model('Competition', competitionSchema);

module.exports = Competition;
