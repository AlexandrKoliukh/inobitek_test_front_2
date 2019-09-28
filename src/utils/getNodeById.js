import { mapTree } from './aroundTree';

export const getNodeById = (id, tree) => {
  const res = [];

  tree.forEach(i => mapTree((node) => {
    const { id: nodeId } = node;
    if (nodeId === id) res.push(node);
    return node;
  }, i));

  return res[0];
};