export const getLocalStorageItem = (key = "token") =>
  localStorage?.getItem(key);

export const setLocalStorageItem = (key, value) =>
  localStorage?.setItem(key, value);

export const removeLocalStorageItem = (key) => localStorage?.removeItem(key);

export const clearLocalStorage = () => localStorage?.clear();
