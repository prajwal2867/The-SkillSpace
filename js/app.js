// js/app.js

let isLoggedIn = false;
let currentUser = null;
let activeCategory = 'Trending';
let searchQuery = '';
let priceFilter = 'All';
let typeFilter = 'All';
let sortFilter = 'Trending';
let currentCarouselIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  const session = validateSession();
  if (session) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
      } catch (e) {
        currentUser = null;
        isLoggedIn = false;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('sessionToken');
      }
    } else {
      localStorage.removeItem('sessionToken');
    }
  } else {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sessionToken');
  }

  renderNavbar();
  renderCommunities();
  setupFilterListeners();
  setupSearchListeners();

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-container') && !e.target.closest('.dropdown-menu')) {
      closeAllDropdowns();
    }
  });
});

function handleFilterChange(type, value) {
  if (type === 'price') priceFilter = value;
  if (type === 'type') typeFilter = value;
  if (type === 'sort') sortFilter = value;
  renderCommunities();
}

function setupFilterListeners() {
  const categoryBtns = document.querySelectorAll('.filters-container .filter-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.textContent.trim();
      renderCommunities();
    });
  });

  const priceRadios = document.querySelectorAll('input[name="price"]');
  priceRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      priceFilter = e.target.value;
      renderCommunities();
    });
  });

  const typeRadios = document.querySelectorAll('input[name="type"]');
  typeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      typeFilter = e.target.value;
      renderCommunities();
    });
  });

  const sortRadios = document.querySelectorAll('input[name="sort"]');
  sortRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      sortFilter = e.target.value;
      renderCommunities();
    });
  });

  const sortSelect = document.querySelector('.select-dropdown');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortFilter = e.target.value;
      renderCommunities();
    });
  }
}

function setupSearchListeners() {
  const searchInput = document.querySelector('#searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderCommunities();
    });
  }
}

function renderNavbar() {
  const navRight = document.querySelector('.navbar-right');
  if (!navRight) return;

  if (!isLoggedIn || !currentUser) {
    navRight.innerHTML = `
      <button class="login-btn" onclick="openLoginModal()">LOG IN</button>
      <button class="signup-btn" onclick="openRegisterModal()">SIGN UP</button>
    `;
  } else {
    const userInitial = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : (currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'U');
    const avatarHTML = currentUser.pfp
      ? `<img src="${currentUser.pfp}" alt="User" class="avatar">`
      : `<div class="user-avatar-initial">${userInitial}</div>`;

    navRight.innerHTML = `
      <!-- Chats -->
      <div class="dropdown-container">
        <button class="icon-btn" onclick="toggleDropdown(event, 'chatsDropdown')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span class="badge">1</span>
        </button>
        <div class="dropdown-menu" id="chatsDropdown" style="width: 420px;">
          <div class="dropdown-header dropdown-header-flex">
            <span>Chats</span>
            <div class="dropdown-actions">
              <span class="action-link">Mark all as read</span>
              <span class="text-muted" style="font-size:12px">All ⌄</span>
            </div>
          </div>
          <div style="padding: 8px 16px;">
            <input type="text" id="chatSearchInput" class="search-input" style="padding: 8px 12px; font-size: 13px; background: var(--bg-main);" placeholder="Search users" oninput="filterChatUsers(this.value)">
          </div>
          <div class="dropdown-items-container" id="chatsItemsContainer" style="max-height: 300px; overflow-y: auto; overscroll-behavior: contain;">
            ${renderChatsItems(mockChats)}
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="dropdown-container">
        <button class="icon-btn" onclick="toggleDropdown(event, 'notifDropdown')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <span class="badge" style="background-color: #ef4444;">3</span>
        </button>
        <div class="dropdown-menu" id="notifDropdown" style="width: 420px;">
          <div class="dropdown-header dropdown-header-flex">
            <span>Notifications</span>
            <div class="dropdown-actions">
              <span class="action-link">Mark all as read</span>
              <span class="text-muted" style="font-size:12px">All ⌄</span>
            </div>
          </div>
          <div class="dropdown-items-container" style="max-height: 350px; overflow-y: auto; overscroll-behavior: contain;">
            ${mockNotifications.map(notif => `
              <div class="notification-item ${notif.unread ? 'unread' : ''}">
                <img src="${notif.avatar}" alt="Avatar" class="notification-avatar">
                <div class="notification-content">
                  <div class="notification-text"><strong>${notif.user}</strong> ${notif.action} • ${notif.time}</div>
                  <div class="notification-subtext">${notif.text}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- User Menu -->
      <div class="dropdown-container">
        <button class="user-avatar-btn" onclick="toggleDropdown(event, 'userDropdown')">
          ${avatarHTML}
        </button>
        <div class="dropdown-menu" id="userDropdown">
          <div class="dropdown-header">${currentUser.email}</div>
          <a class="dropdown-item" onclick="openProfilePage()">Profile</a>
          <a class="dropdown-item" onclick="openSettingsPage()">Settings</a>
          <a class="dropdown-item" onclick="openSettingsTab('affiliates')">Affiliates</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onclick="openSettingsTab('account')"><span class="dropdown-item-content"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> Language</span></a>
          <a class="dropdown-item text-secondary" onclick="alert('SkillSpace Help Center & Documentation')">Help center</a>
          <a class="dropdown-item text-secondary" onclick="openCreateCommunityPage()">Create a community</a>
          <a class="dropdown-item text-secondary" onclick="closeAllPages()">Discover communities</a>
          <a class="dropdown-item text-secondary" onclick="openLogoutConfirmModal()">Log out</a>
        </div>
      </div>
    `;
  }
}

function renderCommunities() {
  const grid = document.getElementById('communitiesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  let filtered = mockCommunities.filter(c => {
    if (searchQuery) {
      const matchTitle = c.title.toLowerCase().includes(searchQuery);
      if (!matchTitle) return false;
    }

    if (activeCategory !== 'Trending' && activeCategory !== 'More...') {
      if (c.category !== activeCategory) return false;
    }

    if (priceFilter !== 'All') {
      if (priceFilter === 'Free' && c.priceType !== 'Free') return false;
      if (priceFilter === 'Paid' && c.priceType !== 'Paid') return false;
    }

    if (typeFilter !== 'All') {
      if (typeFilter === 'Private' && c.accessType !== 'Private') return false;
      if (typeFilter === 'Public' && c.accessType !== 'Public') return false;
    }

    return true;
  });

  if (sortFilter === 'Top') {
    filtered.sort((a, b) => parseFloat(b.members) - parseFloat(a.members));
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: var(--text-muted);">
        <p style="font-size: 18px; margin-bottom: 8px;">No communities found</p>
        <p style="font-size: 14px;">Try adjusting your search query or filters.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(c => {
    const card = document.createElement('div');
    card.className = 'community-card';
    card.innerHTML = `
      <img src="${c.coverUrl}" alt="Cover" class="card-cover">
      <div class="card-content">
        <h3 class="card-title">${c.title}</h3>
        <p class="card-description">${c.description}</p>
        <div class="card-footer">
          <span><strong>${c.members}</strong> Members</span> • <span>${c.price}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderChatsItems(chatList) {
  if (!chatList || chatList.length === 0) {
    return `<div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">No users found</div>`;
  }
  return chatList.map(chat => `
    <div class="notification-item ${chat.unread ? 'unread' : ''}">
      <img src="${chat.avatar}" alt="Avatar" class="notification-avatar">
      <div class="notification-content">
        <div class="notification-text"><strong>${chat.user}</strong> • ${chat.time}</div>
        <div class="notification-subtext">${chat.text}</div>
      </div>
    </div>
  `).join('');
}

function filterChatUsers(query) {
  const container = document.getElementById('chatsItemsContainer');
  if (!container) return;
  const q = query.trim().toLowerCase();
  if (!q) {
    container.innerHTML = renderChatsItems(mockChats);
    return;
  }
  const filtered = mockChats.filter(c => c.user.toLowerCase().includes(q) || c.text.toLowerCase().includes(q));
  container.innerHTML = renderChatsItems(filtered);
}

function closeAllDropdowns() {
  const menus = document.querySelectorAll('.dropdown-menu');
  menus.forEach(m => m.classList.remove('active'));
}

function toggleDropdown(event, id) {
  event.stopPropagation();
  const dropdown = document.getElementById(id);
  if (!dropdown) return;
  const isActive = dropdown.classList.contains('active');

  closeAllDropdowns();

  if (!isActive) {
    dropdown.classList.add('active');
  }
}

// Create Community Modal Functions
function parseMembers(membersStr) {
  const str = String(membersStr).trim();
  const multiplier = str.includes('k') ? 1000 : (str.includes('m') ? 1000000 : 1);
  const num = parseFloat(str) || 0;
  return Math.round(num * multiplier);
}

function parsePrice(priceStr) {
  const str = String(priceStr).trim();
  if (str.toLowerCase() === 'free') return 0;
  const match = str.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
}

function calculateEarnings(membersStr, priceStr) {
  const members = parseMembers(membersStr);
  const price = parsePrice(priceStr);
  return members * price;
}

function formatEarnings(amount) {
  if (amount >= 1000000) {
    return '$' + (amount / 1000000).toFixed(2) + 'M';
  } else if (amount >= 1000) {
    return '$' + (amount / 1000).toFixed(0) + 'k';
  }
  return '$' + amount;
}

function openCreateCommunityPage() {
  closeAllDropdowns();
  const page = document.getElementById('createCommunityPage');
  const main = document.querySelector('.main-content');
  if (page && main) {
    currentCarouselIndex = 0;
    main.classList.add('hidden');
    page.classList.remove('hidden');
    renderCarouselPageItems();
  }
}

function closeCreateCommunityPage() {
  const page = document.getElementById('createCommunityPage');
  const main = document.querySelector('.main-content');
  if (page && main) {
    page.classList.add('hidden');
    main.classList.remove('hidden');
  }
}

function renderCarouselPageItems() {
  const container = document.getElementById('carousel3DContainer');
  const dotsContainer = document.getElementById('carouselControlsDots');
  
  if (!container || !dotsContainer) return;

  container.innerHTML = '';
  dotsContainer.innerHTML = '';

  // Create stack effect with 3 visible cards: previous, current, next
  const prevIndex = (currentCarouselIndex - 1 + mockCommunities.length) % mockCommunities.length;
  const nextIndex = (currentCarouselIndex + 1) % mockCommunities.length;
  const indices = [prevIndex, currentCarouselIndex, nextIndex];

  indices.forEach((index, position) => {
    const community = mockCommunities[index];
    const earnings = calculateEarnings(community.members, community.price);
    const formattedEarnings = formatEarnings(earnings);
    
    const item = document.createElement('div');
    item.className = `carousel-3d-card ${position === 1 ? 'active transforming' : ''}`;
    item.style.zIndex = position === 1 ? 30 : (position === 0 ? 10 : 20);
    item.innerHTML = `
      <div class="carousel-3d-slide">
        <img src="${community.coverUrl}" alt="${community.title}" class="carousel-3d-image">
        <div class="carousel-3d-earnings-badge">
          <div class="badge-community-name">${community.title}</div>
          <div class="badge-earnings-text">Earns ${formattedEarnings}/month</div>
        </div>
      </div>
    `;
    container.appendChild(item);
  });

  // Render pagination dots (show all communities)
  mockCommunities.forEach((community, index) => {
    const dot = document.createElement('button');
    dot.className = `carousel-control-dot ${index === currentCarouselIndex ? 'active' : ''}`;
    dot.onclick = () => goToCarouselSlide(index);
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dotsContainer.appendChild(dot);
  });
}

function nextCarouselSlide() {
  currentCarouselIndex = (currentCarouselIndex + 1) % mockCommunities.length;
  updateCarouselPageView();
}

function prevCarouselSlide() {
  currentCarouselIndex = (currentCarouselIndex - 1 + mockCommunities.length) % mockCommunities.length;
  updateCarouselPageView();
}

function goToCarouselSlide(index) {
  currentCarouselIndex = Math.max(0, Math.min(index, mockCommunities.length - 1));
  updateCarouselPageView();
}

function updateCarouselPageView() {
  renderCarouselPageItems();
}

function handleCreateCommunityClick() {
  if (!isLoggedIn) {
    closeCreateCommunityPage();
    openLoginModal();
  } else {
    alert('Community creation form would appear here');
  }
}
