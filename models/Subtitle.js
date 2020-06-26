const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  srclang: String,
  label: String,
  body: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Subtitle', schema);
