import _ from 'lodash';

export const mapTree = (fn, node) => {
  const { children } = node;
  if (!children) return fn(node);

  return { ...fn(node), children: children.map(node => mapTree(fn, node)) };
};

export const extractChildrenById = (id, tree) => {
  const children = [];

  tree.forEach(i => mapTree((node) => {
    if (node.parent_id === id) children.push(node);
    return;
  }, i));

  return children;
};

const reduce = (fn, node, acc) => {
  const { children } = node;
  const newAcc = fn(acc, node);
  if (!children) return newAcc;

  return children.reduce((acc2, n) => reduce(fn, n, acc2), newAcc);
};

export const getChildrenIdsWide = (id, tree) => {
  const deleteIds = [];

  tree.forEach(i => reduce((acc, n) => {
    if (_.includes(acc, n.parent_id)) deleteIds.push(n.id);

    return _.includes(acc, n.parent_id) ? [...acc, n.id] : acc
  }, i, [id]));

  return _.without(deleteIds);
};
