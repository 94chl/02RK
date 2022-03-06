export const setSessionStorage = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = (key, initialValue) => {
  const result = window.sessionStorage.getItem(key);
  return result ? JSON.parse(result) : initialValue;
};

export const removeSessionStorage = (key) => {
  window.sessionStorage.removeItem(key);
};
