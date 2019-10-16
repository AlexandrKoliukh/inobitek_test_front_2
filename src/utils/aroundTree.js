const mapTree = (fn, node) => {
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
    if (acc.indexOf(parentId) !== -1) deleteIds.push(nodeId);

    return acc.indexOf(parentId) !== -1 ? [...acc, nodeId] : acc
  }, i, [id]));

  return deleteIds;
};


export const getNodeById = (id, tree) => {
  const res = [];

  tree.forEach(i => mapTree((node) => {
    const { id: nodeId } = node;
    if (nodeId === id) res.push(node);
    return node;
  }, i));
  if (!res[0]) return {};
  return res[0];
};
