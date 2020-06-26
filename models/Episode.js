const { Schema, model } = require('mongoose');

const schema = new Schema({
  id: Number,
  subtitles: [
    { type: Schema.Types.ObjectId, ref: 'Subtitle' },
  ],
}, {
  timestamps: true,
});

module.exports = model('Subtitle', schema);
