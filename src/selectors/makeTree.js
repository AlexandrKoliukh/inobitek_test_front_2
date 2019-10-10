import {createSelector} from 'reselect';

const getNodes = (state) => state.nodes.data;

const treeNodesSelector = createSelector(
  getNodes,
  (nodes) => {
    if (!nodes || nodes.length === 0) return [];
    const iter = (items, parent) => {
      parent = parent || null;
      const result = [];
      if (items.length === 0) return;
      items.forEach((item) => {
        const { parent_id: parentId } = item;
        if (parentId === parent) {
          result.push(item);
          item.children = iter(items, item.id);

          if (!item.children.length) {
            delete item.children;
          }
        }
      });
      return result;

    };
    return iter(nodes);
  });

export default treeNodesSelector;
