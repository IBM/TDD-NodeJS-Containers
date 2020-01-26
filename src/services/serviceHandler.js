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
  if (countryCurrencyCode) {
    var currencyUrl = `${BASE_URL_ENDPOINT}${timeIndicator}?base=${baseCode}`;

    try {
      const { data } = await axios.get(currencyUrl);
      if (data.rates[countryCurrencyCode]) {
        return data.rates[countryCurrencyCode];
      } else {
        throw new NotFoundError(`no country code ${countryCurrencyCode}`);
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        throw new NotFoundError(`no country code ${baseCode}`);
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
