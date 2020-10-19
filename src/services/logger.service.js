const fs = require('fs');

const logLevel = {
  info: 'info',
  error: 'error'
};

class Log {
  constructor({
    date = new Date().toISOString(),
    level = logLevel.info,
    errorCode = '',
    message = '',
    stackTrace = ''
  }) {
    this.date = date;
    this.level = level;
    this.errorCode = errorCode;
    this.message = message;
    this.stackTrace = stackTrace;
  }
}

class LoggerService {
  constructor() {
    this.fileName = 'logs/nodejs-course.log';
  }

  info(message) {
    const log = new Log({ message });

    this.write(log);
  }

  error(errorCode, message, stackTrace) {
    const log = new Log({
      errorCode,
      message,
      stackTrace,
      level: logLevel.error
    });
    this.write(log);
  }

  async write(log) {
    let logs = await fs.readFileSync(this.fileName);
    logs += `${JSON.stringify(log)}\n`;
    await fs.writeFileSync(this.fileName, logs, 'utf-8');
  }
}

module.exports = LoggerService;
