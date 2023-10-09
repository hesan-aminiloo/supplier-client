/**
 * Utility function to work with localStorage
 *
 * @param {string} key You can access data with key
 * @param {string} value What value to store
 * @returns {undefined} undefined
 */
// TODO: Replace any
const setLocalStorage = (key: string, value: any) => {
  if (!key) throw new Error('You must provide a key');

  if (typeof value === 'object' && value !== null) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
  return localStorage.setItem(key, value);
};

/**
 * Get item from localStorage
 *
 * @param {string} key
 */
const getLocalStorage = (key: string) => {
  if (!key) throw new Error('You must provide a key');
  try {
    return JSON.parse(localStorage.getItem(key) as string);
  } catch (e) {
    return localStorage.getItem(key);
  }
};

/**
 * Remove item from storage
 *
 * @param {string} key
 * @returns undefined
 */
const deleteFromLocalStorage = (key: string) => {
  if (!key) throw new Error('You must provide a key');

  return localStorage.removeItem(key);
};

export { setLocalStorage, getLocalStorage, deleteFromLocalStorage };
