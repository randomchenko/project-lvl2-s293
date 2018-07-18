import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';

const getDifference = (before, after) => {
  const allKeys = _.union(Object.keys(before), Object.keys(after));
  return allKeys.reduce((acc, key) => {
    if (_.has(after, key) && _.has(before, key)) {
      if (after[key] === before[key]) {
        return [...acc, { key, value: before[key], status: 'ignored' }];
      }
      return [...acc, {
        key,
        oldValue: before[key],
        newValue: after[key],
        status: 'changed',
      }];
    }
    if (_.has(after, key)) {
      return [...acc, { key, value: after[key], status: 'added' }];
    }
    return [...acc, { key, value: before[key], status: 'removed' }];
  }, []);
};

const createString = {
  added: ({ key, value }) => ` + ${key}: ${value}\n`,
  removed: ({ key, value }) => ` - ${key}: ${value}\n`,
  changed: ({ key, oldValue, newValue }) => ` + ${key}: ${newValue}\n - ${key}: ${oldValue}\n`,
  ignored: ({ key, value }) => `   ${key}: ${value}\n`,
};

const genDiff = (beforePath, afterPath) => {
  const beforeText = fs.readFileSync(beforePath);
  const afterText = fs.readFileSync(afterPath);

  const format = path.extname(beforePath).slice(1);

  const parse = getParser(format);

  const beforeData = parse(beforeText);
  const afterData = parse(afterText);
  const difference = getDifference(beforeData, afterData);
  const result = difference.reduce((acc, line) => {
    const newLine = createString[line.status](line);
    return `${acc}${newLine}`;
  }, '');
  return `{\n${result}}\n`;
};

export default genDiff;
