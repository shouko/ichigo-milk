const router = require('express').Router();
const Episode = require('../models/Episode');

router.get('/', (req, res) => {
  Episode.find().limit(Number(req.query.limit) || 20).exec((err, docs) => {
    if (err) return res.sendStatus(500);
    return res.json(docs);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Episode.findOne({ id })
    .populate('subtitles', '_id srclang label')
    .exec((err, result) => {
      if (err) return res.sendStatus(500);
      if (!result) return res.sendStatus(404);
      return res.json(result);
    });
});

module.exports = router;
