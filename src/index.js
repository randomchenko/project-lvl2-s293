import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getRenderer from './renderers';

const checkPresence = (before, after, key) => _.has(before, key) && _.has(after, key);

const keyTypes = [
  {
    type: 'nested',
    check: (before, after, key) => (_.isObject(before[key]) && _.isObject(after[key])
      && !_.isArray(before[key]) && !_.isArray(after[key])),
    process: (beforeVal, afterVal, func) => ({
      children: func(beforeVal, afterVal),
    }),
  },
  {
    type: 'new',
    check: (before, after, key) => (!_.has(before, key) && _.has(after, key)),
    process: (beforeValue, afterValue) => ({
      value: afterValue,
    }),
  },
  {
    type: 'unmodified',
    check: (before, after, key) => (checkPresence(before, after, key)
      && before[key] === after[key]),
    process: beforeValue => ({
      value: beforeValue,
    }),
  },
  {
    type: 'modified',
    check: (before, after, key) => (checkPresence(before, after, key)
      && before[key] !== after[key]),
    process: (beforeValue, afterValue) => ({
      oldValue: beforeValue,
      newValue: afterValue,
    }),
  },
  {
    type: 'deleted',
    check: (before, after, key) => (_.has(before, key) && !_.has(after, key)),
    process: beforeValue => ({
      value: beforeValue,
    }),
  },
];

const getDiffTree = (before, after) => {
  const keysStatus = _.union(Object.keys(before), Object.keys(after));
  return keysStatus.map((key) => {
    const { type, process } = _.find(keyTypes, item => item.check(before, after, key));
    const params = process(before[key], after[key], getDiffTree);
    return { key, type, ...params };
  });
};

const genDiff = (beforePath, afterPath, format = 'tree') => {
  const beforeText = fs.readFileSync(beforePath, 'utf-8');
  const afterText = fs.readFileSync(afterPath, 'utf-8');

  const extension = path.extname(beforePath).slice(1);

  const parse = getParser(extension);

  const beforeData = parse(beforeText);
  const afterData = parse(afterText);
  const difference = getDiffTree(beforeData, afterData);
  const render = getRenderer(format);
  return render(difference);
};

export default genDiff;
