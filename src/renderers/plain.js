import getHandlerByType from '../utils';

const stringify = (element) => {
  if (typeof element === 'object') {
    return 'complex';
  }
  return `'${element}'`;
};

const makePrefix = path => (path.length < 1 ? path.join('.') : `${path.join('.')}.`);

const createString = {
  new: ({ key, value }, path) => `Property '${makePrefix(path)}${key}' was added with ${stringify(value)} value`,
  deleted: ({ key }, path) => `Property '${makePrefix(path)}${key}' was removed`,
  modified: ({ key, oldValue, newValue }, path) => `Property '${makePrefix(path)}${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)} value`,
  nested: ({ children, key }, path, render) => render(children, [...path, key]),
};

const render = (diffs, path = []) => {
  const changedElements = diffs.filter(item => item.type !== 'unmodified');
  const reportElements = changedElements.reduce((acc, item) => {
    const renderedItem = getHandlerByType(item.type, createString)(item, path, render);
    return [...acc, renderedItem];
  }, []);
  return reportElements.join('\n');
};

export default render;
