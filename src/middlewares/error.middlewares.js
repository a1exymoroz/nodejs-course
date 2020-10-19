const LoggerService = require('../services/logger.service');
const loggerService = new LoggerService();

function errorHandler(err, req, res, next) {
  if (err) {
    loggerService.error(500, err.message, err.stack);
    res.status(500).json({
      errorCode: 500,
      message: err.message
    });

    return;
  }

  next();
}

module.exports = errorHandler;
