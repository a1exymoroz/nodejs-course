const LoggerService = require('../services/logger.service');
const loggerService = new LoggerService();

function logger(req, res, next) {
  const log = {
    method: req.method,
    path: req.path,
    body: req.body,
    query: req.query
  };

  loggerService.info(JSON.stringify(log));
  next();
}

module.exports = logger;
