/**
 * Main app.js file for the currency exchange microservice
 */

import createError from 'http-errors';
import express from 'express';
import pino from 'express-pino-logger';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';
import yaml from 'yamljs';
import currencyRouter from './routes/currency';
import NotFoundError from './errors/NotFoundError';

var swaggerDocument = yaml.load('swagger.yaml');
swaggerDocument.host = process.env.HOST_IP || 'localhost:4001';
var scheme = process.env.SCHEME || 'http';
swaggerDocument.schemes = [scheme];

var app = express();
var api = '/api/v1';

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(api + '/currency', currencyRouter);

app.use('/', serve, setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(pino);

// error handler
// it must have 4 parameters for Express to know that this is an error middleware
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }

  // we only return the reason in dev
  if (req.app.get('env') === 'development') {
    return res.status(err.status || 500).json({ error: err.message });
  }
  return res.sendStatus(err.status || 500);
});

process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error.message);
});

export default app;
