const host = 'localhost';
const port = '3001';
const url = `http://${host}:${port}`;

export default {
  nodesUrl: (parentId) => [url, 'getNodesByParentId', parentId].join('/'),
  nodeUrl: (id) => [url, 'getNodeById', id].join('/'),
  nodeRemoveUrl: () => [url, 'deleteNode'].join('/'),
  nodeUpdateUrl: () => [url, 'updateNode'].join('/'),
  nodeAddUrl: () => [url, 'addNode'].join('/'),
};
