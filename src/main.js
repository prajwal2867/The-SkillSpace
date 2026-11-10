import './styles.css';
import { createAppEvents } from './app/events.js';
import { createAuthEvents } from './features/auth/events.js';
import { validateAuthInput, isCheckoutReady } from './domain/validation.js';
import { categories, chats, communities, demoPosts, demoUsers, dummyUsers, notifications } from './domain/data.js';
import { store } from './services/store.js';
import { createDiscoveryFeature } from './features/discovery/views.js';
import { createCommunityViews } from './features/communities/views.js';
import { createProfileFeature } from './features/profile/views.js';
import { createSettingsFeature } from './features/settings/views.js';
import { createBillingFeature } from './features/billing/views.js';
import { createModalViews } from './features/auth/modals.js';
import { createHeader } from './app/header.js';
import { state } from './app/state.js';
import { addImageIcon, escapeHTML, icon, initials } from './shared/ui.js';

store.communities.forEach((community) => {
  const savedCommunity = String(community.id).startsWith('created-') ? { ...community, cover: '', creatorAvatar: '' } : community;
  if (!String(savedCommunity.id).startsWith('created-') || String(savedCommunity.ownerId) === String(store.user?.id)) {
    if (!communities.some((item) => item.id === savedCommunity.id)) communities.push(savedCommunity);
  }
});
const isVisibleCommunity = (community) => !String(community.id).startsWith('created-') || String(community.ownerId) === String(store.user?.id);
const chatItems = chats.map((chat) => ({ ...chat, member: dummyUsers.find((user) => user.name === chat.user) })).filter((chat) => chat.member);
const unreadChatCount = chatItems.filter((chat) => chat.unread).length;
const {
  filteredCommunities,
  card,
  discoverView,
  renderCommunityGrid
} = createDiscoveryFeature({
  state,
  communities,
  categories,
  isVisibleCommunity,
  icon,
  escapeHTML,
  addImageIcon,
  actions
});

const {
  creatorCommunityView,
  createCommunityView,
  detailView
} = createCommunityViews({
  state,
  store,
  communities,
  demoPosts,
  escapeHTML,
  addImageIcon,
  initials
});

const {
  getContributionData,
  profileView
} = createProfileFeature({
  state,
  store,
  communities,
  isVisibleCommunity,
  escapeHTML,
  initials
});

const {
  renderSettingsTabContent,
  settingsView
} = createSettingsFeature({
  state,
  store,
  communities,
  notifications,
  escapeHTML,
  initials
});

const {
  selectPlanView,
  planModalContent
} = createBillingFeature({
  state,
  escapeHTML
});

const {
  communitySettingsModalContent,
  modalCardContent,
  communityCropperModalContent,
  modal
} = createModalViews({
  state,
  communities,
  isVisibleCommunity,
  escapeHTML,
  addImageIcon,
  initials,
  planModalContent
});

const { header } = createHeader({
  state,
  store,
  communities,
  escapeHTML,
  addImageIcon,
  initials,
  icon,
  chatItems,
  unreadChatCount
});

function syncOwnedCommunities() {
  store.communities.forEach((community) => {
    if (String(community.id).startsWith('created-') && String(community.ownerId) === String(store.user?.id) && !communities.some((item) => item.id === community.id)) {
      communities.push({ ...community, cover: '', creatorAvatar: '' });
    }
  });
}



function mountAuthModal() {
  const app = document.querySelector('#app');
  if (!app) return;
  const existingModal = document.querySelector('.modal-backdrop');
  if (existingModal) {
    if (existingModal.classList.contains('is-closing')) {
      existingModal.remove();
    } else {
      existingModal.innerHTML = modalCardContent();
      bindAuth();
      return;
    }
  }
  app.insertAdjacentHTML('beforeend', modal());
  bindAuth();
}

function bindAuth(backdrop) { return authEvents.bindAuth(backdrop); }
function bindCommunityCropper(backdrop) { return authEvents.bindCommunityCropper(backdrop); }

function render() {
  const app = document.querySelector('#app');
  const body = state.view === 'discover' ? discoverView() : state.view === 'create-community' ? createCommunityView() : state.view === 'select-plan' ? selectPlanView() : state.view === 'detail' ? detailView() : state.view === 'creator-community' ? creatorCommunityView() : state.view === 'profile' ? profileView() : settingsView();
  app.innerHTML = `${header()}${body}<div class="toast" id="toast"></div>`;
  document.body.classList.toggle('theme-dark', state.themeMode === 'dark');
  document.body.classList.toggle('chat-open', state.chatMenu);
  document.body.classList.toggle('page-pure-white', state.view === 'create-community' || state.view === 'select-plan');
  bind();
}

function showToast(message) { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2400); }
function closeAuthModal() {
  const backdrop = document.querySelector('.modal-backdrop');
  if (!backdrop) { state.modal = null; return; }
  if (backdrop.classList.contains('is-closing')) return;
  backdrop.classList.add('is-closing');
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    if (backdrop.parentNode) backdrop.remove();
    state.modal = null;
  };
  backdrop.addEventListener('animationend', finish, { once: true });
  setTimeout(finish, 240);
}
function refreshHeader() { const currentHeader = document.querySelector('.topbar-wrapper'); if (!currentHeader) return; currentHeader.outerHTML = header(); document.querySelectorAll('.topbar-wrapper [data-action]').forEach((element) => element.addEventListener('click', (event) => { event.stopPropagation(); actions(element.dataset.action, element); })); }
async function hashPassword(password) { const bytes = new TextEncoder().encode(password); const digest = await crypto.subtle.digest('SHA-256', bytes); return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join(''); }
function findAuthUser(email, passwordHash) { return [...store.users, ...demoUsers].find((user) => user.email.toLowerCase() === email.toLowerCase() && user.passwordHash === passwordHash); }
function setAuthMessage(text, type = 'error') { state.authMessage = { text, type }; const message = document.querySelector('.auth-message'); if (message) { message.textContent = text; message.className = `auth-message ${type}`; } else { const backdrop = document.querySelector('.modal-backdrop'); if (backdrop) { backdrop.innerHTML = modalCardContent(); bindAuth(); } } }
function restoreSession() { const session = store.session; if (!session?.token || !store.user || !session.expiresAt || Date.now() >= session.expiresAt) store.clearSession(); }

let authEvents;
let appEvents;
function actions(action, element) { return appEvents.actions(action, element); }

authEvents = createAuthEvents({ state, communities, isVisibleCommunity, store, modalCardContent, closeAuthModal, render, showToast, setAuthMessage, hashPassword, findAuthUser, syncOwnedCommunities, refreshHeader });
appEvents = createAppEvents({ state, store, communities, notifications, chats, render, showToast, mountAuthModal, closeAuthModal, getContributionData, renderCommunityGrid, isVisibleCommunity, syncOwnedCommunities, refreshHeader, hashPassword, findAuthUser, setAuthMessage, demoUsers, modalCardContent, bindAuth, restoreSession });
function bind() { return appEvents.bind(); }

restoreSession();
state.joinedCommunities = store.getMemberships();
render();