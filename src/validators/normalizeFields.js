export const ip = (value) => {
  const [lastChar, ...b] = [...value].reverse();
  if (!isNaN(parseInt(lastChar)) || lastChar === '.') return value;

  return b.reverse().join('');
};

export const port = (value) => {
  const [lastChar, ...b] = [...value].reverse();
  if (!isNaN(parseInt(lastChar))) return value;

  return b.reverse().join('');
};

export const name = (value) => {
  return value.trim();
};
