/**
 * Service for getting exchange data
 * from an external API
 */
import axios from 'axios';
import NotFoundError from '../errors/NotFoundError';
export const BASE_URL_ENDPOINT = 'https://api.exchangeratesapi.io/';

async function getCurrencyExchangeRate(
  countryCurrencyCode,
  baseCode = 'EUR',
  timeIndicator = 'latest'
) {
  countryCurrencyCode = countryCurrencyCode.toUpperCase();
  baseCode = baseCode.toUpperCase();
  if (countryCurrencyCode) {
    var currencyUrl = `${BASE_URL_ENDPOINT}${timeIndicator}?base=${baseCode}`;

    try {
      const { data } = await axios.get(currencyUrl);
      if (data.rates[countryCurrencyCode]) {
        return data.rates[countryCurrencyCode];
      } else {
        //currencyToCode is invalid
        throw new NotFoundError(
          `The country code ${countryCurrencyCode} is invalid for the currency you want to convert TO.`
        );
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        //currencyFromCode is invalid
        throw new NotFoundError(
          `The country code ${baseCode} is invalid for the currency you want to convert FROM.`
        );
      } else {
        throw e;
      }
    }
  }
  throw new NotFoundError(`please provide a currency code`);
}

async function getCurrencyExchangeRates(timeIndicator = 'latest') {
  const currencyUrl = `${BASE_URL_ENDPOINT}${timeIndicator}`;
  const { data } = await axios.get(currencyUrl);
  return data;
}

async function convertCurrency(fromValue, fromCurrencyCode, toCurrencyCode, historicalDate) {
  const exchangeRate = await getCurrencyExchangeRate(
    toCurrencyCode,
    fromCurrencyCode,
    historicalDate
  );
  return fromValue * exchangeRate;
}

export { getCurrencyExchangeRate, getCurrencyExchangeRates, convertCurrency };
