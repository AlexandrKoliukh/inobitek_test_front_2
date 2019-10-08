const host = 'localhost';
const port = '3001';

const getUrl = (query) => {
    const base = process.env.NODE_ENV === 'production' ? '/' : `http://${host}:${port}/`;
    return `${base}${query}`
};

export const getNodesByParentId = async (parentId) => {
    const url = getUrl(`getNodesByParentId?parentId=${parentId}`);
    console.log(url);
    const res = await fetch(url);
    return res.json();
};

export const addNode = async (node) => {
    const url = getUrl('addNode');
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(node),
    });
    return res.json();
};

export const removeNode = async (node) => {
    const url = getUrl('deleteNode');
    const res = await fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: node.id }),
    });
    return res.json();
};

export const updateNode = async (node) => {
    const url = getUrl('updateNode');
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(node),
    });
    return res.json();
};
