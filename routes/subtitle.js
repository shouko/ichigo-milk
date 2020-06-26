const router = require('express').Router();
const { ObjectId } = require('mongoose').Types;
const Subtitle = require('../models/Subtitle');
const cors = require('../middleware/cors');
const { adminOnly } = require('../middleware/auth');

router.get('/', adminOnly, (req, res) => {
  Subtitle.find().limit(Number(req.query.limit) || 20).exec((err, docs) => {
    if (err) return res.sendStatus(500);
    return res.json(docs);
  });
});

router.post('/', adminOnly, (req, res) => {
  const { srclang, label, body } = req.body;

  new Subtitle({ meta: { srclang, label }, body }).save((err) => {
    if (err) return res.sendStatus(500);
    return res.sendStatus(200);
  });
});

router.get('/:id', cors, (req, res) => {
  const { id } = req.params;
  Subtitle.findOne({ _id: ObjectId(id) }, (err, result) => {
    if (err) return res.sendStatus(500);
    if (!result) return res.sendStatus(404);
    res.contentType('text/vtt');
    return res.send(result.body);
  });
});

module.exports = router;
