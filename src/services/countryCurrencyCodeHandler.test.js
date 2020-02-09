import {
  getCurrencyNameAndCode,
  getCountryAndCurrencyCode,
  getNumberOfEntriesInCsv,
} from './countryCurrencyCodeHandler';

describe('Get Currency Name and Code without country parameter', () => {
  it('should return a error country is required', async () => {
    await expect(getCurrencyNameAndCode()).rejects.toThrowError('please pass in a country name');
  });
});

describe('Get Currency Name and Code given a well known country that does not exist, i.e. Westeros', () => {
  it('should return a error for a non-existent country Westeros', async () => {
    await expect(getCurrencyNameAndCode('Westeros')).rejects.toThrow(
      'no country found for country name Westeros'
    );
  });
});

describe('Get Currency Name and Code given a well known country that does exist, i.e. South Africa', () => {
  it('should return metadata for a specific country, i.e.South Africa', async () => {
    const data = await getCurrencyNameAndCode('South Africa');
    expect(data).toEqual({
      country: 'South Africa',
      currencyName: 'South African rand',
      currencyCode: 'ZAR',
    });
  });
});

describe('Get Currency Name and Country name(s) in a list given a well known country code that does exist for 1 country, i.e. ZAR', () => {
  it('should return metadata for a specific country code, i.e. ZAR', async () => {
    const data = await getCountryAndCurrencyCode('ZAR');
    expect(data).toEqual({
      currencyCode: 'ZAR',
      currencyName: 'South African rand',
      country: ['South Africa'],
    });
  });
});

describe('Count the number of coutries in the csv file', () => {
  it('should return the length of the csv file', async () => {
    const lenCsv = await getNumberOfEntriesInCsv();
    expect(lenCsv).toEqual({
      lenCsv: 253,
    });
  });
});

describe('Get Currency Name and Country name(s) in a list given a well known country code that does exist for  MORE than one country, i.e. USD', () => {
  it('should return metadata for a specific country code, i.e. USD', async () => {
    const data = await getCountryAndCurrencyCode('USD');
    const expectedCountries = [
      'American Samoa',
      'Bonaire',
      'British Indian Ocean Territory',
      'British Virgin Islands',
      'Caribbean Netherlands',
      'Ecuador',
      'El Salvador',
      'Guam',
      'Marshall Islands',
      'Micronesia',
      'Northern Mariana Islands',
      'Palau',
      'Panama',
      'Puerto Rico',
      'Saba',
      'Sint Eustatius',
      'Timor-Leste',
      'Turks and Caicos Islands',
      'United States of America',
      'US Virgin Islands',
      'Wake Island',
      'Zimbabwe',
    ];

    expect(data).toEqual({
      currencyCode: 'USD',
      currencyName: 'United States dollar',
      country: expectedCountries,
    });
  });
});
