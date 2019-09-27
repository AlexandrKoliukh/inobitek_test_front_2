import { createSelector } from 'reselect';
import _ from 'lodash';

const getNodes = (state) => state.nodes;

const treeNodesSelector = createSelector(
  getNodes,
  (nodes) => {
    if (!nodes || nodes.length === 0) return [];
  const iter = (items, parent) => {
    parent = parent || null;
    const result = [];
    if (items.length === 0) return;
    items.forEach((item) => {
      if (item.parent_id === parent) {
        result.push(item);
        item.children = iter(items, item.id);

        if (!item.children.length) {
          delete item.children;
        }
      }
    });
    return result;

  };
  return iter(nodes).filter(i => _.isNull(i.parent_id));
});

export default treeNodesSelector;
