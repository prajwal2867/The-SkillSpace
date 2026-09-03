const USER_KEY = 'skillspace_user_v2';
const POSTS_KEY = 'skillspace_posts_v2';
const USERS_KEY = 'skillspace_users_v2';
const SESSION_KEY = 'skillspace_session_v2';

export const store = {
  get user() { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); },
  set user(value) { value ? localStorage.setItem(USER_KEY, JSON.stringify(value)) : localStorage.removeItem(USER_KEY); },
  get users() { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); },
  saveUser(user) { localStorage.setItem(USERS_KEY, JSON.stringify([...this.users, user])); },
  findUser(email) { return this.users.find((user) => user.email.toLowerCase() === email.toLowerCase()); },
  get session() { try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; } },
  get sessionToken() { return this.session?.token || null; },
  saveSession(user) { const session = { token: crypto.randomUUID(), userId: user.id, createdAt: Date.now(), expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 }; localStorage.setItem(SESSION_KEY, JSON.stringify(session)); this.user = user; return session.token; },
  clearSession() { localStorage.removeItem(SESSION_KEY); this.user = null; },
  get posts() { return JSON.parse(localStorage.getItem(POSTS_KEY) || '[]'); },
  addPost(post) { localStorage.setItem(POSTS_KEY, JSON.stringify([post, ...this.posts])); }
};