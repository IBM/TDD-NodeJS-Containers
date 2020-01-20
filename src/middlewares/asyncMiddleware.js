/*
  This middleware simply wraps the whole handler with a promise.
  Thanks to this, if a promise is rejected somewhere in the call stack,
  we will catch it and pass it to express error middleware.
  */
const asyncMiddleware = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(error => next(error));

export default asyncMiddleware;
