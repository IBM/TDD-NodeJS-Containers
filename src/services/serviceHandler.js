/**
 * Service for getting exchange data
 * from an external API
 */
import axios from 'axios';

export const BASE_URL_ENDPOINT = 'https://api.exchangeratesapi.io/';

async function getCurrencyExchangeRate(
  countryCurrencyCode,
  baseCode = 'EUR',
  timeIndicator = 'latest'
) {
  if (countryCurrencyCode) {
    var currencyUrl = `${BASE_URL_ENDPOINT}${timeIndicator}?base=${baseCode}`;

    const { data } = await axios.get(currencyUrl);
    if (data.rates[countryCurrencyCode]) {
      return data.rates[countryCurrencyCode];
    } else {
      throw new Error(`no country code ${countryCurrencyCode}`);
    }
  }
  throw new Error(`please provide a currency code`);
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
