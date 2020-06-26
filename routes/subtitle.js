const router = require('express').Router();
const { Types } = require('mongoose');
const Subtitle = require('../models/Subtitle');

router.get('/', (req, res) => {
  Subtitle.find().limit(Number(req.query.limit) || 20).exec((err, docs) => {
    if (err) return res.sendStatus(500);
    return res.json(docs);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Subtitle.findOne({ _id: Types.ObjectId(id) }, (err, result) => {
    if (err) return res.sendStatus(500);
    if (!result) return res.sendStatus(404);
    res.contentType('text/vtt');
    return res.send(result.body);
  });
});

module.exports = router;
