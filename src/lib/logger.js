import winston from 'winston';
import * as expressWinston from 'express-winston';

const { combine, json, timestamp } = winston.format;

const logger = winston.createLogger({
  format: combine(
    timestamp(),
    json({
      space: process.env.NODE_ENV === 'production' ? 0 : 2,
    })
  ),
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
    }),
  ],
});

export const errorLoggerMiddleware = expressWinston.errorLogger({
  msg: '{{err.message}}',
  winstonInstance: logger,
  requestWhitelist: ['url', 'method', 'httpVersion', 'originalUrl'],
  blacklistedMetaFields: [
    'stack',
    'exception',
    'level',
    'date',
    'os',
    'trace',
    'process',
    'message',
  ],
});

export default logger;
