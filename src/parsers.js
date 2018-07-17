import { safeLoad } from 'js-yaml';
import { parse as iniParse } from 'ini';

const parsers = {
  ini: iniParse,
  json: JSON.parse,
  yml: safeLoad,
};

export default format => (data) => {
  const parser = parsers[format];
  if (!parser) {
    throw new Error(`This format ${format} isn't known.`);
  }
  return parser(data);
};
