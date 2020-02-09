/**
 * Service for getting metadata for
 * currency name and short
 * 3 char code by country/territory name
 * from CSV file in data dir
 * Country,CurrencyName,CurrencyCode
 *
 */
import csv from 'csvtojson';
import NotFoundError from '../errors/NotFoundError';

async function readData() {
  const jsonArray = await csv({
    delimiter: ',',
  }).fromFile('./data/countryCurrencyMetadata.csv');
  return jsonArray;
}

async function getNumberOfEntriesInCsv() {
  //look at csv and count
  const data = await readData();
  return { lenCsv: data.length };
}

async function getCurrencyNameAndCode(countryName) {
  if (!countryName) {
    throw new Error('please pass in a country name');
  }

  const data = await readData();
  const countryRow = data.find(row => row.country.toLowerCase() === countryName.toLowerCase());

  if (!countryRow) {
    throw new NotFoundError(`no country found for country name ${countryName}`);
  }

  return countryRow;
}

async function getCountryAndCurrencyCode(currencyCode) {
  if (!currencyCode) {
    throw new Error('please pass in a 3 character currency code');
  }

  const data = await readData();

  //arrow (lambda) function called on each item in the array to match
  const matches = data.filter(row => row.currencyCode.toLowerCase() === currencyCode.toLowerCase());
  if (matches.length === 0) throw new NotFoundError(`currency code ${currencyCode} not found`);

  return {
    currencyCode: matches[0].currencyCode,
    currencyName: matches[0].currencyName,
    country: matches.map(row => row.country), //mapping on matches to extract currency name
  };
}

export { getCurrencyNameAndCode, getCountryAndCurrencyCode, getNumberOfEntriesInCsv };
