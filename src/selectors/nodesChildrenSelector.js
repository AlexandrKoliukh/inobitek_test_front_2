import { createSelector } from 'reselect';

const getNodes = state => state.nodes

const childrenSelector = createSelector(
  getNodes,
  (nodes) => {
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
    return iter(nodes);
  }
);

export default childrenSelector;
