import pino from 'pino';
export default pino({
  level: process.env.LOG_LEVEL || 'warn',
  prettyPrint: process.env.NODE_ENV !== 'production',
});
