/**
 * Router for currency rate conversions
 */

import { Router } from 'express';
import asyncMiddleware from '../middlewares/asyncMiddleware';
import * as countryCurrencyCodeHandler from '../services/countryCurrencyCodeHandler';
import { getCurrencyExchangeRates, convertCurrency } from '../services/serviceHandler';

var router = Router();

/* GET list of currency locations */
router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const data = await getCurrencyExchangeRates();
    res.json(data);
  })
);

/* POST
/search:
post:
*/
router.post(
  '/search',
  asyncMiddleware(async (req, res) => {
    const { Country, CurrencyCode } = req.body;
    if (Country) {
      const result = await countryCurrencyCodeHandler.getCurrencyNameAndCode(Country);
      return res.json(result);
    }
    if (CurrencyCode) {
      const result = await countryCurrencyCodeHandler.getCountryAndCurrencyCode(CurrencyCode);
      return res.json(result);
    }
    return res.status(400).json({ error: 'please pass in either Country or CurrencyCode' });
  })
);

/* GET
/currency/{currencyFromAmount}/{currencyFromCode}/{currencyToCode}:
*/
router.get(
  '/:currencyFromAmount/:currencyFromCode/:currencyToCode',
  asyncMiddleware(async (req, res) => {
    const { currencyFromAmount, currencyFromCode, currencyToCode } = req.params;

    const data = await convertCurrency(
      parseFloat(currencyFromAmount.trim()),
      currencyFromCode.trim(),
      currencyToCode.trim(),
      'latest'
    );

    res.json({ result: data });
  })
);

export default router;
