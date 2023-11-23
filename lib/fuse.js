import Fuse from 'fuse.js';

export const fuzzySearch = (data, searchTerm) => {
  const options = {
    keys: ['title', 'url', 'items.title', 'items.url'],
    threshold: 0.4,
    includeMatches: true,
  };

  const fuse = new Fuse(data, options);
  return fuse.search(searchTerm);
};
