const port = 3001;
const base = process.env.NODE_ENV === 'production' ? '/' : `http://localhost:${port}/`;

const getUrl = (query) => `${base}${query}`;

const getPostHeaders = (data) => ({
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data),
});

const getResponse = (res) => {
  if (!res.ok) {
    return res.json()
      .then((data) => Promise.reject(new Error(data.error)));
  }
  return res.json();
};

export const getNodesByParentId = (parentId) => {
  const url = getUrl(`getNodesByParentId?parentId=${parentId}`);
  return fetch(url).then(getResponse);
};

export const addNode = (node) => {
  const url = getUrl('addNode');
  return fetch(url, getPostHeaders(node))
    .then(getResponse);
};

export const removeNode = (nodeId) => {
  const url = getUrl('deleteNode');
  return fetch(url, getPostHeaders(nodeId))
    .then(getResponse);
};

export const updateNode = (node) => {
  const url = getUrl('updateNode');
  return fetch(url, getPostHeaders(node))
    .then(getResponse);
};
