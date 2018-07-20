import { safeLoad } from 'js-yaml';
import { parse as iniParse } from 'ini';
import getHandlerByType from './utils';

const parsers = {
  ini: iniParse,
  json: JSON.parse,
  yml: safeLoad,
};

export default format => getHandlerByType(format, parsers);
