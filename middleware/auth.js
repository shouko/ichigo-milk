const config = require('../config');

module.exports = {
  adminOnly: (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || authorization !== config.adminToken) {
      return res.sendStatus(403);
    }
    return next();
  },
};
