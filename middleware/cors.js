const config = require('../config');

module.exports = (req, res, next) => {
  try {
    const origin = req.headers.origin || new URL(req.headers.referer).origin;
    if (!origin || config.allowedOrigins.indexOf(origin) === -1
    ) throw new Error();
    res.setHeader('access-control-allow-origin', origin);
    res.setHeader('access-control-allow-credentials', true);
    return next();
  } catch (e) {
    return res.sendStatus(400);
  }
};
