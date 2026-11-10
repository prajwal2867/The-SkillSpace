import './styles.css';
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
      const email = data.email.trim().toLowerCase();
      if (!email || !data.password || (state.authMode === 'register' && (!data.firstName?.trim() || !data.lastName?.trim() || !data.confirmPassword))) return setAuthMessage('All fields are required.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setAuthMessage('Please enter a valid email address.');
      if (data.password.length < 8) return setAuthMessage('Password must be at least 8 characters.');
      if (state.authMode === 'register' && data.password !== data.confirmPassword) return setAuthMessage('Passwords do not match.');
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
      const month = Number(expiryMonth.value);
      const isReady = communityName.value.trim().length > 0
        && /^\d{1,16}$/.test(cardNumber.value)
        && /^\d{1,2}$/.test(expiryMonth.value)
        && /^\d{2}$/.test(expiryYear.value)
        && /^\d{3}$/.test(cvc.value)
        && month >= 1 && month <= 12;
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

function bind() {
  document.querySelectorAll('[data-auth]:not(.modal-backdrop [data-auth])').forEach((element) => element.addEventListener('click', () => { state.authMode = element.dataset.auth; state.modal = 'auth'; mountAuthModal(); }));
  document.querySelectorAll('[data-action]').forEach((element) => element.addEventListener('click', (event) => {
    event.stopPropagation();
    actions(element.dataset.action, element);
  }));
  document.querySelectorAll('[data-category]').forEach((element) => element.addEventListener('click', () => { state.category = element.dataset.category; render(); }));
  document.querySelector('#search')?.addEventListener('input', (event) => { state.query = event.target.value; });
  document.querySelector('#search')?.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); state.submittedQuery = state.query.trim(); render(); } });
  document.querySelector('#topSearch')?.addEventListener('submit', (event) => { event.preventDefault(); state.submittedQuery = state.query.trim(); render(); });
  document.querySelector('#topSearchInput')?.addEventListener('input', (event) => { state.query = event.target.value; });
  
  document.querySelectorAll('.filter-menu-popup input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
      const type = event.target.dataset.filterType;
      const val = event.target.value;
      if (type === 'price') state.price = val;
      else if (type === 'access') state.access = val;
      else if (type === 'sort') state.sort = val;
      renderCommunityGrid();
    });
  });

  const carouselDeck = document.querySelector('.community-carousel-deck');
  if (carouselDeck) {
    carouselDeck.querySelectorAll('.carousel-card-item').forEach((item) => {
      item.addEventListener('click', () => {
        const idx = Number(item.dataset.slideIndex || 0);
        state.createSlideIndex = idx;
        render();
      });
    });
  }

  document.querySelector('[data-community]')?.parentElement.addEventListener('click', (event) => { const cardElement = event.target.closest('[data-community]'); if (cardElement && !event.target.closest('button')) { state.selected = /^\d+$/.test(cardElement.dataset.community) ? Number(cardElement.dataset.community) : cardElement.dataset.community; state.view = 'detail'; render(); } });
  document.querySelector('#postForm')?.addEventListener('submit', (event) => { event.preventDefault(); const text = new FormData(event.target).get('text'); store.addPost({ communityId: state.selected, name: store.user.name, role: 'Member', text, time: 'now' }); render(); showToast('Post published'); });
  
  document.querySelector('#profileSettingsForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const fName = document.querySelector('#setFirstName').value.trim();
    const lName = document.querySelector('#setLastName').value.trim();
    const bio = document.querySelector('#setBio').value.trim();
    const location = document.querySelector('#setLocation')?.value.trim() || '';
    store.user = {
      ...(store.user || {}),
      name: `${fName} ${lName}`.trim(),
      bio,
      location
    };
    render();
    showToast('Profile updated successfully!');
  });

  document.querySelector('#setBio')?.addEventListener('input', (event) => {
    const counter = document.querySelector('#bioCharCount');
    if (counter) counter.textContent = `${event.target.value.length} / 150`;
  });

  document.querySelectorAll('[data-settings]').forEach((element) => element.addEventListener('click', () => {
    state.settingsTab = element.dataset.settings;
    render();
  }));

  const heatmapGrid = document.querySelector('#heatmapGrid');
  const tooltip = document.querySelector('#heatmapTooltip');
  if (heatmapGrid && tooltip) {
    heatmapGrid.addEventListener('mouseover', (event) => {
      const square = event.target.closest('.heatmap-square');
      if (square) {
        const count = square.dataset.count;
        const date = square.dataset.date;
        const text = count === '0' ? `No contributions on ${date}` : `${count} contribution${count === '1' ? '' : 's'} on ${date}`;
        tooltip.textContent = text;
        tooltip.classList.add('active');

        const container = heatmapGrid.closest('.heatmap-container');
        const containerRect = container.getBoundingClientRect();
        const sqRect = square.getBoundingClientRect();
        const left = sqRect.left - containerRect.left + sqRect.width / 2;
        const top = sqRect.top - containerRect.top;
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
      }
    });

    heatmapGrid.addEventListener('mouseleave', () => {
      tooltip.classList.remove('active');
    });
  }

  document.querySelector('#profileContributionSelect')?.addEventListener('change', (event) => {
    state.selectedContributionGroup = event.target.value;
    const { days, totalContributions } = getContributionData(event.target.value);
    const grid = document.querySelector('#heatmapGrid');
    if (grid) {
      grid.innerHTML = days.map(d => `<div class="heatmap-square level-${d.level}" data-date="${d.dateStr}" data-count="${d.count}"></div>`).join('');
    }
    const statNum = document.querySelector('#userContributionStat');
    if (statNum) statNum.textContent = totalContributions;
  });
}

document.addEventListener('click', (event) => {
  const profileMenu = document.querySelector('#userProfileMenu');
  const profileControl = document.querySelector('#profileControlContainer');
  if (profileMenu && profileControl && !profileControl.contains(event.target)) {
    profileMenu.classList.remove('active');
    state.profileMenu = false;
  }

  const brandMenu = document.querySelector('#brandDropdownMenu');
  const brandContainer = document.querySelector('#brandContainer');
  if (brandMenu && brandContainer && !brandContainer.contains(event.target)) {
    brandMenu.classList.remove('active');
    state.brandMenu = false;
  }

  const filterPopup = document.querySelector('#filterPopup');
  const filterContainer = document.querySelector('#filterDropdownContainer');
  if (filterPopup && filterContainer && !filterContainer.contains(event.target)) {
    filterPopup.classList.remove('active');
    state.filterMenu = false;
  }

  const chatMenu = document.querySelector('#chatMenu');
  const chatContainer = document.querySelector('#chatControlContainer');
  if (chatMenu && chatContainer && !chatContainer.contains(event.target)) {
    chatMenu.classList.remove('active');
    state.chatMenu = false;
    document.body.classList.remove('chat-open');
  }
});

function actions(action, element) {
  if (action === 'discover' || action === 'reset') {
    state.view = 'discover';
    state.profileMenu = false;
    state.brandMenu = false;
    state.filterMenu = false;
    const bMenu = document.querySelector('#brandDropdownMenu');
    if (bMenu) bMenu.classList.remove('active');
    if (action === 'reset') {
      state.query = '';
      state.submittedQuery = '';
      state.category = 'Trending';
      state.price = 'All';
      state.access = 'All';
    }
    render();
  } else if (action === 'toggle-brand-menu') {
    state.brandMenu = !state.brandMenu;
    if (state.brandMenu) {
      state.profileMenu = false;
      state.chatMenu = false;
      state.filterMenu = false;
    }
    render();
  } else if (action === 'clear-search') {
    state.query = '';
    state.submittedQuery = '';
    render();
  } else if (action === 'create') {
    state.profileMenu = false;
    state.brandMenu = false;
    state.filterMenu = false;
    const bMenu = document.querySelector('#brandDropdownMenu');
    if (bMenu) bMenu.classList.remove('active');
    state.view = 'create-community';
    render();
  } else if (action === 'start-community-flow') {
    state.view = 'select-plan';
    render();
  } else if (action === 'toggle-plan-billing') {
    state.planBilling = element?.dataset.billing || 'monthly';
    render();
  } else if (action === 'toggle-profile-community') {
    state.profileCommunityView = element?.dataset.communityView || 'memberships';
    render();
  } else if (action === 'select-plan') {
    const selectedPlan = element?.dataset.plan || 'Pro';
    state.selectedPlan = selectedPlan;
    state.modal = store.user ? 'plan' : 'auth';
    if (!store.user) state.authMode = 'login';
    mountAuthModal();
  } else if (action === 'community-settings') {
    state.modal = 'community-settings';
    mountAuthModal();
  } else if (action === 'login' || action === 'register') {
    state.authMode = action;
    state.modal = 'auth';
    mountAuthModal();
  } else if (action === 'close-modal') {
    closeAuthModal();
  } else if (action === 'profile') {
    if (!store.user) {
      state.authMode = 'login';
      state.modal = 'auth';
      mountAuthModal();
    } else {
      state.profileMenu = !state.profileMenu;
      if (state.profileMenu) {
        state.chatMenu = false;
        state.brandMenu = false;
        state.filterMenu = false;
      }
      render();
    }
  } else if (action === 'toggle-filter-menu') {
    state.filterMenu = !state.filterMenu;
    if (state.filterMenu) {
      state.profileMenu = false;
      state.chatMenu = false;
      state.brandMenu = false;
    }
    render();
  } else if (action === 'profile-page') {
    const menu = document.querySelector('#userProfileMenu');
    if (menu) menu.classList.remove('active');
    state.profileMenu = false;
    state.view = 'profile';
    render();
  } else if (action === 'settings' || action === 'affiliates') {
    const menu = document.querySelector('#userProfileMenu');
    if (menu) menu.classList.remove('active');
    state.profileMenu = false;
    state.view = 'settings';
    if (action === 'affiliates') state.settingsTab = 'affiliates';
    render();
  } else if (action === 'logout') {
    store.clearSession();
    const menu = document.querySelector('#userProfileMenu');
    if (menu) menu.classList.remove('active');
    state.profileMenu = false;
    state.brandMenu = false;
    state.filterMenu = false;
    state.chatMenu = false;
    document.body.classList.remove('chat-open');
    render();
  } else if (action === 'join') {
    if (!store.user) {
      state.authMode = 'login';
      state.modal = 'auth';
      mountAuthModal();
    } else {
      const activeComm = communities.find(c => c.id === state.selected) || communities[0];
      if (activeComm && !state.joinedCommunities.includes(activeComm.id)) {
        state.joinedCommunities.push(activeComm.id);
        showToast(`Joined ${activeComm.title}!`);
        render();
      }
    }
  } else if (action === 'leave') {
    const activeComm = communities.find(c => c.id === state.selected) || communities[0];
    if (activeComm) {
      state.joinedCommunities = state.joinedCommunities.filter(id => id !== activeComm.id);
      showToast(`Left ${activeComm.title}`);
      render();
    }
  } else if (action === 'notifications') {
    showToast(`${notifications.length} new notifications`);
  } else if (action === 'chats') {
    state.chatMenu = !state.chatMenu;
    if (state.chatMenu) {
      state.profileMenu = false;
      state.brandMenu = false;
      state.filterMenu = false;
    }
    render();
  } else if (action === 'mark-chats-read') {
    chats.forEach((chat) => { chat.unread = false; });
    state.chatMenu = true;
    render();
  } else if (action === 'language' || action === 'help') {
    const menu = document.querySelector('#userProfileMenu');
    if (menu) menu.classList.remove('active');
    state.profileMenu = false;
    showToast(action === 'language' ? 'Language preferences' : 'Help center');
    render();
  } else if (action === 'copy-affiliate-link') {
    const linkInput = document.querySelector('#affiliateLinkInput');
    if (linkInput) {
      navigator.clipboard?.writeText(linkInput.value).catch(() => {});
      showToast('Affiliate link copied to clipboard!');
    }
  } else if (action === 'save-theme') {
    const themeSelect = document.querySelector('#themeSelector');
    if (themeSelect) {
      state.themeMode = themeSelect.value;
      render();
      showToast(`Theme switched to ${state.themeMode} mode!`);
    }
  } else if (action === 'prev-create-slide') {
    const total = 5;
    state.createSlideIndex = ((state.createSlideIndex || 0) - 1 + total) % total;
    render();
  } else if (action === 'next-create-slide') {
    const total = 5;
    state.createSlideIndex = ((state.createSlideIndex || 0) + 1) % total;
    render();
  } else if (action === 'select-create-slide') {
    const slideIdx = Number(element?.dataset.slide || 0);
    state.createSlideIndex = slideIdx;
    render();
  } else if (action === 'select-media-thumb') {
    const thumbBtn = document.querySelector(`[data-action="select-media-thumb"][data-index="${element?.dataset.index}"]`);
    const idx = Number(element?.dataset.index || 0);
    state.selectedMediaIndex = idx;
    render();
  } else if (action === 'select-subnav-tab') {
    state.communityTab = element?.dataset.tab || 'About';
    render();
  } else if (action === 'select-community') {
    const rawId = element?.dataset.id || 1;
    const id = /^\d+$/.test(rawId) ? Number(rawId) : rawId;
    const selectedCommunity = communities.find((community) => String(community.id) === String(id));
    state.selected = id;
    state.view = selectedCommunity && String(selectedCommunity.id).startsWith('created-') && String(selectedCommunity.ownerId) === String(store.user?.id)
      ? 'creator-community'
      : 'detail';
    state.selectedMediaIndex = 0;
    state.communityTab = 'About';
    state.brandMenu = false;
    render();
  } else if (action === 'see-more-reviews') {
    showToast('All reviews loaded');
  } else if (action === 'change-photo' || action === 'change-email' || action === 'change-password' || action === 'logout-everywhere' || action === 'add-payment-method') {
    const messages = {
      'change-photo': 'Photo uploader ready',
      'change-email': 'Email update modal ready',
      'change-password': 'Password update modal ready',
      'logout-everywhere': 'Logged out from all other devices',
      'add-payment-method': 'Payment modal ready'
    };
    showToast(messages[action] || 'Action triggered');
  } else if (action === 'community-upload-icon' || action === 'community-upload-cover') {
    const selector = action === 'community-upload-icon' ? '.community-settings-icon-upload input' : '.community-settings-cover-upload input';
    document.querySelector(selector)?.click();
  }
}
restoreSession();
render();