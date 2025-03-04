import winston from 'winston';

const options = winston.format.combine(
  winston.format.label({
    label: '[LOGGER]',
  }),
  winston.format.timestamp({
    format: 'YY-MM-DD HH:mm:ss',
  }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const objMessage = info.message;
    let formattedMessage = typeof objMessage === 'object' ? JSON.stringify(objMessage, null, 2) : objMessage;

    if (info.meta && Object.keys(info.meta).length) {
      formattedMessage += `\n${JSON.stringify(info.meta, null, 2)}`;
    }

    return ` ${info.label}  ${info.timestamp}  ${info.level} : ${formattedMessage}`;
  }),
  winston.format.colorize({
    all: true,
  }),
);

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), options),
    }),
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new winston.transports.File({
      filename: 'e2e/output/logs/error.log',
      maxFiles: 5,
      maxsize: 5 * 1024,
      level: 'error',
      format: winston.format.combine(winston.format.colorize(), options),
    }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new winston.transports.File({
      filename: 'e2e/output/logs/combined.log',
      maxFiles: 5,
      maxsize: 5 * 1024,
      format: winston.format.combine(options),
    }),
  ],
});
