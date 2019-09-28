import _ from 'lodash';

export const mapTree = (fn, node) => {
  const { children } = node;
  if (!children) return fn(node);

  return { ...fn(node), children: children.map(node => mapTree(fn, node)) };
};

const reduceTree = (fn, node, acc) => {
  const { children } = node;
  const newAcc = fn(acc, node);
  if (!children) return newAcc;

  return children.reduce((acc2, n) => reduceTree(fn, n, acc2), newAcc);
};

export const extractChildrenById = (id, tree) => {
  const children = [];

  tree.forEach(i => mapTree((node) => {
    const { parent_id: parentId } = node;
    if (parentId === id) children.push(node);
    return node;
  }, i));

  return children;
};

export const getChildrenIdsWide = (id, tree) => {
  const deleteIds = [];

  tree.forEach(i => reduceTree((acc, node) => {
    const { parent_id: parentId, id: nodeId } = node;
    if (_.includes(acc, parentId)) deleteIds.push(nodeId);

    return _.includes(acc, parentId) ? [...acc, nodeId] : acc
  }, i, [id]));

  return _.without(deleteIds);
};
