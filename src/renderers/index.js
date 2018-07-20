import plainRender from './plain';
import jsonRender from './json';
import getHandlerByType from '../utils';
import treeRender from './tree';

const renderers = {
  tree: treeRender,
  plain: plainRender,
  json: jsonRender,
};

export default format => getHandlerByType(format, renderers);
