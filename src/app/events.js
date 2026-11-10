/**
 * Application-level DOM event wiring and user actions.
 * Rendering functions and application state are injected to keep this module
 * independent from feature view templates.
 */
export function createAppEvents(deps) {
  const { state, store, communities, notifications, chats, render, showToast, mountAuthModal, closeAuthModal, getContributionData, renderCommunityGrid, isVisibleCommunity, syncOwnedCommunities, refreshHeader, hashPassword, findAuthUser, setAuthMessage, demoUsers, modalCardContent, bindAuth, restoreSession } = deps;

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
          state.joinedCommunities = [...state.joinedCommunities, activeComm.id];
          store.saveMemberships(state.joinedCommunities);
          state.selected = activeComm.id;
          state.communityTab = 'Community';
          state.view = 'creator-community';
          showToast(`Joined ${activeComm.title}!`);
          render();
        }
      }
    } else if (action === 'leave') {
      const activeComm = communities.find(c => c.id === state.selected) || communities[0];
      if (activeComm) {
        state.joinedCommunities = state.joinedCommunities.filter(id => id !== activeComm.id);
        store.saveMemberships(state.joinedCommunities);
        state.view = 'detail';
        state.communityTab = 'About';
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
      const isOwner = selectedCommunity && String(selectedCommunity.id).startsWith('created-') && String(selectedCommunity.ownerId) === String(store.user?.id);
      const isMember = (state.joinedCommunities || []).some((joinedId) => String(joinedId) === String(id));
      state.view = isOwner || isMember ? 'creator-community' : 'detail';
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

  return { bind, actions };
}
