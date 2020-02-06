import axios from 'axios';
import {
  getCurrencyExchangeRate,
  getCurrencyExchangeRates,
  convertCurrency,
} from './serviceHandler';
import ratesMock from './mocks/rates.json';

describe('Get all currency exchange rates', () => {
  it('should return all 3 letter country codes with currency for the day', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        rates: {
          CAD: 1.4679,
        },
        base: 'EUR',
        date: '2019-11-22',
      },
    });
    const data = await getCurrencyExchangeRates();
    expect(data.rates).toEqual({ CAD: 1.4679 });
    expect(data.base).toEqual('EUR');
  });
});

describe('Expect non empty list of 32 for all currency exchange rates', () => {
  it('should return all 3 letter country codes with currency for the day', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce(ratesMock);
    const data = await getCurrencyExchangeRates();
    expect(Object.keys(data.rates)).toHaveLength(32);
  });
});

describe('Get a specific rate for a specific country code that does not exist, i.e. USA', () => {
  it('should throw an error', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce(ratesMock);
    await expect(getCurrencyExchangeRate('XYZ')).rejects.toThrow(
      'The country code XYZ is invalid for the currency you want to convert TO.'
    );
  });
});

describe('Get a specific rate for a specific country code that does exist, i.e. USD', () => {
  it('should return a numeric rate for a specific country code', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce(ratesMock);
    const value = await getCurrencyExchangeRate('USD');
    expect(value).toEqual(1.1058);
  });
});

describe('convertCurrency', () => {
  it('should return a numeric rate', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce(ratesMock);

    var result = await convertCurrency(10, 'EUR', 'USD', 'latest');

    expect(result).toEqual(11.058);
  });
});
