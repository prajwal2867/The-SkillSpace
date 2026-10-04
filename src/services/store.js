let currentUser = null;

export const store = {
  get user() { return currentUser; },
  set user(value) { currentUser = value; },
  clearSession() { currentUser = null; }
};