const router = require('express').Router();
const { ObjectId } = require('mongoose').Types;
const config = require('../config');
const Episode = require('../models/Episode');
const cors = require('../middleware/cors');
const { adminOnly } = require('../middleware/auth');

router.get('/', adminOnly, (req, res) => {
  Episode.find().limit(Number(req.query.limit) || 20).exec((err, docs) => {
    if (err) return res.sendStatus(500);
    return res.json(docs);
  });
});

router.put('/:id', adminOnly, (req, res) => {
  const { subtitles } = req.body;
  const { id } = req.params;

  new Episode({ id, subtitles }).save((err) => {
    if (err) return res.sendStatus(500);
    return res.sendStatus(200);
  });
});

router.patch('/:id', adminOnly, (req, res) => {
  const { id } = req.params;
  const { subtitles } = req.body;
  Episode.findOneAndUpdate({ id }, {
    $push: {
      subtitles: {
        $each: subtitles.map((e) => ObjectId(e)),
      },
    },
  }, (err) => {
    if (err) return res.sendStatus(500);
    return res.sendStatus(200);
  });
});

router.get('/:id', cors, (req, res) => {
  const { id } = req.params;
  Episode.findOne({ id })
    .populate('subtitles', '_id meta active')
    .exec((err, result) => {
      if (err) return res.sendStatus(500);
      if (!result) return res.sendStatus(404);
      return res.json({
        subtitles: result.subtitles
          .filter((x) => x.active)
          .map(({ _id, meta: { srclang, label } }) => ({
            srclang,
            label,
            src: `${config.baseUrl}/subtitle/${_id}`,
          })),
      });
    });
});

module.exports = router;
