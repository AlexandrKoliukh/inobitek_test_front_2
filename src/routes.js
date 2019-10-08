const host = 'localhost';
const port = '3001';
const url = `http://${host}:${port}`;

export default {
  nodesUrl: (parentId) => [url, `getNodesByParentId?parentId=${parentId}`].join('/'),
  nodeRemoveUrl: () => [url, 'deleteNode'].join('/'),
  nodeUpdateUrl: () => [url, 'updateNode'].join('/'),
  nodeAddUrl: () => [url, 'addNode'].join('/'),
};
