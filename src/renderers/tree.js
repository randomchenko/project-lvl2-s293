import _ from 'lodash';
import getHandlerByType from '../utils';

const indentSpacesCount = 3;

const createSpaces = depth => ' '.repeat(depth * indentSpacesCount);

const stringify = (element, depth) => {
  if (!_.isObject(element)) {
    return element;
  }
  const body = Object.keys(element).reduce((acc, key) => {
    const curElement = element[key];
    if (!_.isObject(curElement)) {
      return [...acc, `${key}: ${curElement}`];
    }
    const stringified = stringify(curElement, depth + 1);
    return [...acc, `${key}: ${stringified}`];
  }, []);
  const spaces = createSpaces(depth);
  const indentBody = body.map(key => `${spaces}   ${key}`).join('\n');
  return `{\n${indentBody}\n${spaces}}`;
};

const pair = ({ key, value }, depth) => `${key}: ${stringify(value, depth)}`;
const stringBuilders = {
  new: (...args) => ` + ${pair(...args)}`,
  deleted: (...args) => ` - ${pair(...args)}`,
  modified: ({ key, oldValue, newValue }, depth) => [` + ${key}: ${stringify(newValue, depth)}`, ` - ${key}: ${stringify(oldValue, depth)}`],
  unmodified: (...args) => `   ${pair(...args)}`,
  nested: ({ key, children }, depth, render) => `   ${key}: ${render(children, depth)}`,
};


const render = (diffs, depth = 0) => {
  const body = diffs.reduce((acc, item) => {
    const renderedElement = getHandlerByType(item.type, stringBuilders)(item, depth + 1, render);
    return [...acc, renderedElement];
  }, []);
  const spaces = createSpaces(depth);
  const bodyWithIndents = _.flatten(body).map(element => `${spaces}${element}`).join('\n');
  return `{\n${bodyWithIndents}\n${spaces}}`;
};

export default render;
