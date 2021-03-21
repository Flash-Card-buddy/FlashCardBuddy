const {format_date, format_plural} = require('../utils/helpers');


test('format_date() returns a date string', () => {
  const date = new Date('2020-03-20 16:12:03');

  expect(format_date(date)).toBe('3/20/2020');
});

test('format_plural() correctly pluralizes words', () => {
  const plural = format_plural('Tiger', 2);
  const singular = format_plural('Lion', 1);

  expect(plural).toBe('Tigers');
  expect(singular).toBe('Lion');
});