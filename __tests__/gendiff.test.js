import fs from 'fs';
import genDiff from '../src';

const path = '__tests__/__fixtures__/';

test('json', () => {
  const expected1 = fs.readFileSync(`${path}1/expected`).toString();
  expect(genDiff(`${path}1/before.json`, `${path}1/after.json`)).toBe(expected1);
});
