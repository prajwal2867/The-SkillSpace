const POSTS_KEY = 'skillspace_posts_v2';
const COMMUNITIES_KEY = 'skillspace_communities_v1';
let currentUser = null;

export const store = {
  get user() { return currentUser; },
  set user(value) { currentUser = value; },
  clearSession() { currentUser = null; },
  get posts() { return JSON.parse(localStorage.getItem(POSTS_KEY) || '[]'); },
  addPost(post) { localStorage.setItem(POSTS_KEY, JSON.stringify([post, ...this.posts])); },
  get communities() { return JSON.parse(localStorage.getItem(COMMUNITIES_KEY) || '[]'); },
  saveCommunity(community) { localStorage.setItem(COMMUNITIES_KEY, JSON.stringify([...this.communities, community])); },
  updateCommunity(community, ownerId = this.user?.id) { localStorage.setItem(COMMUNITIES_KEY, JSON.stringify(this.communities.map((item) => item.id === community.id && String(item.ownerId) === String(ownerId) ? community : item))); }
};