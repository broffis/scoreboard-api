const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true,
  },
  flag: {
    type: String
  }
}, {
  timestamps: true,
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;

