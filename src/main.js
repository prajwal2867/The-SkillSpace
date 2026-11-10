import './styles.css';
import { createAppEvents } from './app/events.js';
import { validateAuthInput, isCheckoutReady } from './domain/validation.js';
import { categories, chats, communities, demoUsers, dummyUsers, notifications } from './domain/data.js';
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

function bindAuth() {
  const backdrop = document.querySelector('.modal-backdrop');
  if (!backdrop) return;

  if (state.modal === 'community-cropper') bindCommunityCropper(backdrop);

  backdrop.querySelectorAll('[data-auth]').forEach((element) => {
    element.onclick = (e) => {
      e.stopPropagation();
      state.authMode = element.dataset.auth;
      state.authMessage = '';
      backdrop.innerHTML = modalCardContent();
      bindAuth();
    };
  });

  backdrop.querySelectorAll('[data-action="close-modal"]').forEach((element) => {
    element.onclick = (e) => {
      e.stopPropagation();
      closeAuthModal();
    };
  });

  backdrop.querySelectorAll('[data-action="community-upload-icon"], [data-action="community-upload-cover"]').forEach((element) => {
    element.onclick = (event) => {
      event.stopPropagation();
      const selector = element.dataset.action === 'community-upload-icon' ? '.community-settings-icon-upload input' : '.community-settings-cover-upload input';
      backdrop.querySelector(selector)?.click();
    };
  });

  backdrop.querySelectorAll('[data-action="toggle-plan-billing"]').forEach((element) => {
    element.onclick = (e) => {
      e.stopPropagation();
      state.planBilling = element.dataset.billing || 'monthly';
      backdrop.innerHTML = modalCardContent();
      bindAuth();
    };
  });

  backdrop.querySelectorAll('[data-action="select-plan"]').forEach((element) => {
    element.onclick = (e) => {
      e.stopPropagation();
      const planName = element.dataset.plan || 'Pro';
      closeAuthModal();
      showToast(`Selected ${planName} plan! Setting up your community...`);
    };
  });

  backdrop.querySelectorAll('[data-action="change-plan"]').forEach((element) => {
    element.onclick = (e) => {
      e.stopPropagation();
      closeAuthModal();
      state.view = 'select-plan';
      render();
    };
  });

  backdrop.onclick = (event) => {
    if (event.target === backdrop) closeAuthModal();
  };

  const communitySettingsForm = document.querySelector('#communitySettingsForm');
  if (communitySettingsForm) {
    communitySettingsForm.querySelectorAll('.community-settings-upload input[type="file"]').forEach((input) => {
      input.addEventListener('change', () => {
        const file = input.files?.[0];
        if (!file || !file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = () => {
          state.cropper = { type: input.closest('.community-settings-icon-upload') ? 'icon' : 'cover', src: reader.result };
          state.modal = 'community-cropper';
          backdrop.innerHTML = modalCardContent();
          bindAuth();
        };
        reader.readAsDataURL(file);
        input.value = '';
      });
    });
    communitySettingsForm.onsubmit = (event) => {
      event.preventDefault();
      const activeCommunity = communities.find((item) => item.id === state.selected && isVisibleCommunity(item));
      const data = Object.fromEntries(new FormData(communitySettingsForm));
      if (!activeCommunity) return;
      const media = state.pendingCommunityMedia;
      Object.assign(activeCommunity, { title: data.title.trim(), description: data.description.trim(), accessType: data.accessType, accent: data.color.trim() || activeCommunity.accent });
      if (media?.type === 'cover') activeCommunity.cover = media.dataUrl;
      if (media?.type === 'icon') activeCommunity.creatorAvatar = media.dataUrl;
      store.updateCommunity(activeCommunity, store.user?.id);
      state.pendingCommunityMedia = null;
      closeAuthModal();
      render();
      showToast('Group settings saved');
    };
    communitySettingsForm.querySelectorAll('textarea, input[name="title"]').forEach((field) => field.addEventListener('input', (event) => {
      const counter = event.target.parentElement.querySelector('.community-settings-counter');
      if (counter) counter.textContent = `${event.target.value.length}/${event.target.maxLength}`;
    }));
    const colorPicker = communitySettingsForm.querySelector('#communitySettingsColorPicker');
    const colorInput = communitySettingsForm.querySelector('#communitySettingsColor');
    colorPicker?.addEventListener('input', () => { colorInput.value = colorPicker.value; });
    colorInput?.addEventListener('input', () => {
      if (/^#[0-9a-fA-F]{6}$/.test(colorInput.value)) colorPicker.value = colorInput.value;
    });
  }

  const forgotForm = document.querySelector('#forgotForm');
  if (forgotForm) {
    forgotForm.onsubmit = (event) => {
      event.preventDefault();
      state.authMode = 'sent';
      backdrop.innerHTML = modalCardContent();
      bindAuth();
    };
  }

  const authForm = document.querySelector('#authForm');
  if (authForm) {
    authForm.onsubmit = async (event) => {
      event.preventDefault();
      state.authMessage = '';
      const data = Object.fromEntries(new FormData(event.target));
      const email = String(data.email || '').trim().toLowerCase();
      const validationMessage = validateAuthInput(data, state.authMode);
      if (validationMessage) return setAuthMessage(validationMessage);
      const passwordHash = await hashPassword(data.password);
      if (state.authMode === 'register') {
        if (findAuthUser(email, passwordHash) || store.findUser(email)) return setAuthMessage('An account with this email already exists.');
        const newUser = { id: crypto.randomUUID(), name: `${data.firstName.trim()} ${data.lastName.trim()}`, email, passwordHash, bio: 'Curious, learning in public.' };
        store.saveUser(newUser);
        state.authMode = 'login';
        state.authMessage = { text: 'Account created successfully. Log in to continue.', type: 'success' };
        backdrop.innerHTML = modalCardContent();
        bindAuth();
        return;
      }
      const user = findAuthUser(email, passwordHash) || store.findUser(email);
      if (!user || user.passwordHash !== passwordHash) return setAuthMessage('Invalid email or password.');
      store.saveSession(user);
      syncOwnedCommunities();
      refreshHeader();
      if (state.selectedPlan) {
        state.modal = 'plan';
        state.authMessage = '';
        const backdrop = document.querySelector('.modal-backdrop');
        backdrop.innerHTML = modalCardContent();
        bindAuth();
      } else {
        closeAuthModal();
        showToast('Welcome back');
      }
    };
  }

  const planCheckoutForm = document.querySelector('#planCheckoutForm');
  if (planCheckoutForm) {
    const communityName = planCheckoutForm.querySelector('[name="communityName"]');
    const trialButton = planCheckoutForm.querySelector('.plan-trial-button');
    const cardNumber = planCheckoutForm.querySelector('[name="cardNumber"]');
    const expiryMonth = planCheckoutForm.querySelector('[name="expiryMonth"]');
    const expiryYear = planCheckoutForm.querySelector('[name="expiryYear"]');
    const cvc = planCheckoutForm.querySelector('[name="cvc"]');
    const updateTrialButton = () => {
      const isReady = isCheckoutReady({
        communityName: communityName.value,
        cardNumber: cardNumber.value,
        expiryMonth: expiryMonth.value,
        expiryYear: expiryYear.value,
        cvc: cvc.value
      });
      trialButton.disabled = !isReady;
    };

    communityName?.addEventListener('input', (event) => {
      const counter = document.querySelector('#communityNameCount');
      if (counter) counter.textContent = `${event.target.value.length} / 30`;
      updateTrialButton();
    });

    const cardSteps = [...planCheckoutForm.querySelectorAll('[data-card-step]')];
    cardSteps.forEach((field, index) => {
      field.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/\D/g, '').slice(0, Number(event.target.maxLength));
        if (event.target.value.length === Number(event.target.maxLength)) cardSteps[index + 1]?.focus();
        updateTrialButton();
      });
      field.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && !event.target.value && index > 0) {
          cardSteps[index - 1].focus();
        }
      });
    });
    updateTrialButton();

    planCheckoutForm.onsubmit = (event) => {
      event.preventDefault();
      const name = new FormData(planCheckoutForm).get('communityName').trim();
      const user = store.user || { name: 'Creator' };
      const community = {
        id: `created-${crypto.randomUUID()}`,
        ownerId: user.id,
        title: name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        description: 'A private community for creators.',
        members: '1',
        onlineCount: '0',
        adminsCount: '1',
        price: 'Free trial',
        priceType: 'Free',
        accessType: 'Private',
        category: 'Trending',
        cover: '',
        creatorName: user.name || 'Creator',
        creatorAvatar: user.pfp || ''
      };
      communities.push(community);
      store.saveCommunity(community);
      state.joinedCommunities = [...new Set([...(state.joinedCommunities || []), community.id])];
      state.selected = community.id;
      state.communityTab = 'Community';
      state.view = 'creator-community';
      closeAuthModal();
      state.selectedPlan = null;
      render();
      showToast(`${name} is ready to set up.`);
    };
  }
}

function bindCommunityCropper(backdrop) {
  const viewport = backdrop.querySelector('.community-cropper-viewport');
  const image = backdrop.querySelector('#communityCropImage');
  const zoom = backdrop.querySelector('#communityCropZoom');
  const zoomValue = backdrop.querySelector('#communityCropZoomValue');
  if (!viewport || !image || !zoom) return;
  const crop = { zoom: 1, offsetX: 0, offsetY: 0, dragging: false, startX: 0, startY: 0, frame: 0 };
  let viewportRect = viewport.getBoundingClientRect();
  let imageScale = 1;
  let imageWidth = 0;
  let imageHeight = 0;
  const updateMetrics = () => {
    viewportRect = viewport.getBoundingClientRect();
    imageScale = Math.max(viewportRect.width / image.naturalWidth, viewportRect.height / image.naturalHeight) * crop.zoom;
    imageWidth = image.naturalWidth * imageScale;
    imageHeight = image.naturalHeight * imageScale;
  };
  const clampOffsets = () => {
    crop.offsetX = Math.max(viewportRect.width - imageWidth, Math.min(0, crop.offsetX));
    crop.offsetY = Math.max(viewportRect.height - imageHeight, Math.min(0, crop.offsetY));
  };
  const draw = () => {
    const left = (viewportRect.width - imageWidth) / 2 + crop.offsetX;
    const top = (viewportRect.height - imageHeight) / 2 + crop.offsetY;
    image.style.width = `${imageWidth}px`;
    image.style.height = `${imageHeight}px`;
    image.style.transform = `translate(${left}px, ${top}px)`;
    zoomValue.textContent = `${Math.round(crop.zoom * 100)}%`;
  };
  const scheduleDraw = () => {
    if (crop.frame) return;
    crop.frame = requestAnimationFrame(() => { crop.frame = 0; clampOffsets(); draw(); });
  };
  image.onload = () => { updateMetrics(); scheduleDraw(); };
  zoom.oninput = () => { crop.zoom = Number(zoom.value); updateMetrics(); scheduleDraw(); };
  viewport.onpointerdown = (event) => { crop.dragging = true; crop.startX = event.clientX - crop.offsetX; crop.startY = event.clientY - crop.offsetY; viewport.setPointerCapture(event.pointerId); };
  viewport.onpointermove = (event) => { if (!crop.dragging) return; crop.offsetX = event.clientX - crop.startX; crop.offsetY = event.clientY - crop.startY; scheduleDraw(); };
  viewport.onpointerup = () => { crop.dragging = false; };
  viewport.onpointercancel = () => { crop.dragging = false; };
  window.addEventListener('resize', () => { updateMetrics(); scheduleDraw(); }, { passive: true, once: true });
  if (image.complete) { updateMetrics(); scheduleDraw(); }
  backdrop.querySelector('[data-action="save-community-crop"]')?.addEventListener('click', () => {
    const viewportRect = viewport.getBoundingClientRect();
    const imageScale = Math.max(viewportRect.width / image.naturalWidth, viewportRect.height / image.naturalHeight) * crop.zoom;
    const imageWidth = image.naturalWidth * imageScale;
    const imageHeight = image.naturalHeight * imageScale;
    const left = (viewportRect.width - imageWidth) / 2 + crop.offsetX;
    const top = (viewportRect.height - imageHeight) / 2 + crop.offsetY;
    const outputWidth = state.cropper.type === 'icon' ? 512 : 1084;
    const outputHeight = state.cropper.type === 'icon' ? 512 : 576;
    const canvas = document.createElement('canvas');
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const context = canvas.getContext('2d');
    context.drawImage(image, Math.max(0, -left / imageScale), Math.max(0, -top / imageScale), viewportRect.width / imageScale, viewportRect.height / imageScale, 0, 0, outputWidth, outputHeight);
    state.pendingCommunityMedia = { type: state.cropper.type, dataUrl: canvas.toDataURL('image/jpeg', 0.9) };
    state.cropper = null;
    state.modal = 'community-settings';
    backdrop.innerHTML = modalCardContent();
    bindAuth();
  });
}

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
function refreshHeader() { const currentHeader = document.querySelector('.topbar-wrapper'); if (!currentHeader) return; currentHeader.outerHTML = header(); document.querySelectorAll('.topbar-wrapper [data-action]').forEach((element) => element.addEventListener('click', () => actions(element.dataset.action, element))); }
async function hashPassword(password) { const bytes = new TextEncoder().encode(password); const digest = await crypto.subtle.digest('SHA-256', bytes); return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join(''); }
function findAuthUser(email, passwordHash) { return [...store.users, ...demoUsers].find((user) => user.email.toLowerCase() === email.toLowerCase() && user.passwordHash === passwordHash); }
function setAuthMessage(text, type = 'error') { state.authMessage = { text, type }; const message = document.querySelector('.auth-message'); if (message) { message.textContent = text; message.className = `auth-message ${type}`; } else { const backdrop = document.querySelector('.modal-backdrop'); if (backdrop) { backdrop.innerHTML = modalCardContent(); bindAuth(); } } }
function restoreSession() { const session = store.session; if (!session?.token || !store.user || !session.expiresAt || Date.now() >= session.expiresAt) store.clearSession(); }

let appEvents;
function actions(action, element) { return appEvents.actions(action, element); }

appEvents = createAppEvents({ state, store, communities, notifications, chats, render, showToast, mountAuthModal, closeAuthModal, getContributionData, renderCommunityGrid, isVisibleCommunity, syncOwnedCommunities, refreshHeader, hashPassword, findAuthUser, setAuthMessage, demoUsers, modalCardContent, bindAuth, restoreSession });
function bind() { return appEvents.bind(); }

restoreSession();
render();