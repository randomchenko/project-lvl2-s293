import getHandlerByType from '../utils';

const stringify = (element) => {
  if (typeof element === 'object') {
    return 'complex';
  }
  return `'${element}'`;
};

const makePrefix = path => (path.length === 0 ? path.join('.') : `${path.join('.')}.`);

const createString = {
  new: ({ key, value }, path) => `Property '${makePrefix(path)}${key}' was added with ${stringify(value)} value`,
  deleted: ({ key }, path) => `Property '${makePrefix(path)}${key}' was removed`,
  modified: ({ key, oldValue, newValue }, path) => `Property '${makePrefix(path)}${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)} value`,
  nested: ({ children, key }, path, render) => render(children, [...path, key]),
};

const render = (diffs, arr = []) => {
  const changedElements = diffs.filter(element => element.type !== 'unmodified');
  const reportElements = changedElements.reduce((acc, element) => {
    const renderedElements = getHandlerByType(element.type, createString)(element, arr, render);
    return [...acc, renderedElements];
  }, []);
  return reportElements.join('\n');
};

export default render;
