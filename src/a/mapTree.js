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
