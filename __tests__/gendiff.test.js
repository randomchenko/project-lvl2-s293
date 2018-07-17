import fs from 'fs';
import genDiff from '../src';

const path = '__tests__/__fixtures__/';

test('json', () => {
  const expected1 = fs.readFileSync(`${path}1/expected`).toString();
  expect(genDiff(`${path}1/before.json`, `${path}1/after.json`)).toBe(expected1);
});

test('yml', () => {
  const expected2 = fs.readFileSync(`${path}2/expected`).toString();
  expect(genDiff(`${path}3/before.yml`, `${path}2/after.yml`)).toBe(expected2);
});
