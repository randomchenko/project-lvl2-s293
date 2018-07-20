import fs from 'fs';
import genDiff from '../src';

const path = '__tests__/__fixtures__/';

test('1', () => {
  const e1 = fs.readFileSync(`${path}1/e`).toString();
  expect(genDiff(`${path}1/b.json`, `${path}1/a.json`)).toBe(e1);
});
test('2', () => {
  const e2 = fs.readFileSync(`${path}2/e`).toString();
  expect(genDiff(`${path}2/b.json`, `${path}2/a.json`)).toBe(e2);
});
test('3', () => {
  const e3 = fs.readFileSync(`${path}3/e`).toString();
  expect(genDiff(`${path}3/b.json`, `${path}3/a.json`)).toBe(e3);
});
test('4', () => {
  const e4 = fs.readFileSync(`${path}4/e`).toString();
  expect(genDiff(`${path}4/b.json`, `${path}4/a.json`)).toBe(e4);
});
test('5', () => {
  const e5 = fs.readFileSync(`${path}5/e`).toString();
  expect(genDiff(`${path}5/b.json`, `${path}5/a.json`)).toBe(e5);
});
