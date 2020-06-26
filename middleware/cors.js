const config = require('../config');

module.exports = (req, res, next) => {
  if (
    !req.headers.origin
    || config.allowedOrigins.indexOf(req.headers.origin) === -1
  ) return res.sendStatus(400);
  res.setHeader('access-control-allow-origin', req.headers.origin);
  res.setHeader('access-control-allow-credentials', true);
  return next();
};
