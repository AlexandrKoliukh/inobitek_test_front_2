export const mapTree = (fn, node) => {
  const { children } = node;
  if (!children) return fn(node);

  return { ...fn(node), children: children.map(node => mapTree(fn, node)) };
};
