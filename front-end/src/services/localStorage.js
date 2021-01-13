export const saveToLocalStorage = (key, entry) => {
  let formattedEntry = entry;
  if (typeof entry === 'object') {
    formattedEntry = JSON.stringify(entry);
  }
  localStorage.setItem(key, formattedEntry);
};
// need to add the case empty key
export const loadFromLocalStorage = (key) => {
  if (key === 'user') return JSON.parse(localStorage.getItem(key));
  if (key === 'cart') return JSON.parse(localStorage.getItem(key));

  return localStorage.getItem(key);
};

export const deleteFromLocalStorage = (key) => {
  // console.log('localstorage', key);
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
