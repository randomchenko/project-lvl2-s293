const getHandlerByType = (type, parsers) => (data, ...args) => {
  const parser = parsers[type];
  if (!parser) {
    throw new Error(`This format ${type} isn't known.`);
  }
  return parser(data, ...args);
};

export default getHandlerByType;
