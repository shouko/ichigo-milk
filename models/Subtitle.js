const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  meta: {
    srclang: String,
    label: String,
  },
  body: String,
  active: { type: Boolean, default: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Subtitle', schema);
