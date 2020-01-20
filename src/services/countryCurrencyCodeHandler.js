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

  let outputDict = null;
  let outputRows = [];
  let counter = 0;

  for (var row in data) {
    var row_ = data[row];
    if (row_.currencyCode.toLowerCase() === currencyCode.toLowerCase()) {
      counter++;
      if (counter === 1) {            //create output dict.
        outputDict = row_;
      }
      outputRows.push(row_.country);
    }
  }

  if (row_.length === 0 && outputDict === null) {
    throw new NotFoundError(`currency code ${currencyCode} not found`);
  }

  outputDict.country = outputRows;

  return outputDict;
}

export { getCurrencyNameAndCode, getCountryAndCurrencyCode };
