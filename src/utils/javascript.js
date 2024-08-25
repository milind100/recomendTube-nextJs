export const length = (arr) => arr?.length;

export const head = (arr) => arr?.[0];

export const last = (arr) => arr?.[length(arr) - 1];

export const lowerCase = (str) => str?.toLowerCase();

export const isArray = (obj) => Array?.isArray(obj);

export const keys = (obj = {}) => Object?.keys(obj);

export const values = (obj = {}) => Object?.values(obj);

export const isEmptyObject = (obj = {}) => keys(obj)?.length === 0;

export const isUndefined = (val) => val === undefined;

export const getObject = (array, key) => {
  return array.find((obj) => obj?.name === key) || {};
};
