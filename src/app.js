const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const borderRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const errorMiddleware = require('./middlewares/error.middlewares');
const loggerMiddleware = require('./middlewares/logger.middlewares');
const LoggerService = require('./services/logger.service');
const loggerService = new LoggerService();
const connectDb = require('./db/db.js');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

connectDb(() => {
  app.use(express.json());

  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
      return;
    }
    next();
  });

  app.use(loggerMiddleware);

  app.use('/users', userRouter);
  app.use('/boards', borderRouter);
  app.use('/boards', taskRouter);

  app.use(errorMiddleware);

  process.on('uncaughtException', err => {
    loggerService.error(
      500,
      `Uncaught Exception: ${err.message}, ${err.stack}`
    );
  });

  process.on('unhandledRejection', (reason, promise) => {
    loggerService.error(500, `Unhandled Rejection: ${promise} / ${reason}`);
  });

  // throw Error('Test error.');
  // Promise.reject(Error('Test error.'));
});

module.exports = app;
