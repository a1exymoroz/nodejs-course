const { JWT_SECRET_KEY } = require('../common/config');
const jwt = require('jsonwebtoken');
const { UserNotAuthorizedError } = require('../common/errors');

async function checkTokenMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    next(new UserNotAuthorizedError());
    return;
  }

  await jwt.verify(token.replace('Bearer ', ''), JWT_SECRET_KEY, err => {
    if (err) {
      next(new UserNotAuthorizedError());
      return;
    }

    next();
    return;
  });
}

module.exports = checkTokenMiddleware;
