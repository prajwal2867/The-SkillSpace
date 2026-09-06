import './styles.css';
import { categories, chats, communities, demoUsers, notifications } from './domain/data.js';
import { store } from './services/store.js';

const state = { view: 'discover', category: 'Trending', price: 'All', access: 'All', sort: 'Trending', query: '', submittedQuery: '', selected: null, settingsTab: 'profile', modal: null, authMode: 'login', profileMenu: false, filterMenu: false, authMessage: '', themeMode: 'light', selectedContributionGroup: 'All communities', selectedMediaIndex: 0, communityTab: 'About', joinedCommunities: [], planBilling: 'monthly' };
const icon = (name) => ({
  search: '⌕',
  bell: '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 10h18c0-2-3-3-3-10Z"></path><path d="M10 21h4"></path></svg>',
  chat: '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.7 8.7 0 0 1-3.4-.7L4 20l1.2-3.6A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"></path></svg>',
  plus: '+', arrow: '↗', back: '←', lock: '◈', user: '●',
  globe: '<svg class="nav-icon-inline" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"></path></svg>'
}[name] || '•');
const initials = (user = store.user) => (user?.name || user?.email || 'U').slice(0, 1).toUpperCase();
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

function filteredCommunities() {
  const query = state.submittedQuery.toLowerCase();
  const result = communities.filter((community) => (!query || `${community.title} ${community.description} ${community.category}`.toLowerCase().includes(query)) && (state.category === 'Trending' || community.category === state.category) && (state.price === 'All' || community.priceType === state.price) && (state.access === 'All' || community.accessType === state.access));
  if (state.sort === 'Top') result.sort((a, b) => parseFloat(b.members) - parseFloat(a.members));
  return result;
}

function header() {
  if (state.view === 'select-plan') {
    return `
      <header class="topbar-wrapper plan-page-header">
        <div class="topbar-container plan-header-container">
          <button class="wordmark" data-action="discover"><span>skill</span>space</button>
        </div>
      </header>
    `;
  }
  const user = store.user;
  const activeComm = state.selected ? (communities.find(c => c.id === state.selected) || communities[0]) : null;
  const isDetail = state.view === 'detail';

  const topSearch = `
    <form class="topbar-search-form" id="topSearch">
      <svg class="topbar-search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input id="topSearchInput" value="${escapeHTML(state.query)}" placeholder="Search" aria-label="Search communities">
      ${state.query ? `<button type="button" class="topbar-search-clear" data-action="clear-search" aria-label="Clear search">×</button>` : ''}
    </form>
  `;
  
  const profileMenu = user ? `
    <div class="profile-menu ${state.profileMenu ? 'active' : ''}" id="userProfileMenu">
    <div class="profile-menu-email">${escapeHTML(user.email)}</div>
    <button data-action="profile-page">Profile</button>
    <button data-action="settings">Settings</button>
    <button data-action="affiliates">Affiliates</button>
    <div class="profile-menu-divider"></div>
    <button class="profile-menu-muted" data-action="language">${icon('globe')} Language</button>
    <button class="profile-menu-muted" data-action="help">Help center</button>
    <button class="profile-menu-muted" data-action="create">Create a community</button>
    <button class="profile-menu-muted" data-action="discover">Discover communities</button>
    <div class="profile-menu-divider logout-divider"></div>
    <button class="profile-menu-muted" data-action="logout">Log out</button>
  </div>
  ` : '';

  const backButton = isDetail ? `
    <button class="topbar-back-btn" data-action="discover" title="Go back to Home" aria-label="Go back to home page">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
    </button>
  ` : '';

  const brandArea = `
    <div class="brand-container" id="brandContainer">
      ${backButton}
      ${isDetail && activeComm ? `
        <div class="community-header-brand" data-action="toggle-brand-menu">
          <img src="${activeComm.creatorAvatar || activeComm.cover}" class="community-brand-icon" alt="">
          <span class="community-brand-name">${escapeHTML(activeComm.title)}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:4px;"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      ` : `
        <button class="wordmark" data-action="toggle-brand-menu"><span>skill</span>space</button>
        <button class="community-switcher-btn" data-action="toggle-brand-menu" title="Switch communities" aria-label="Switch communities">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 15 12 20 17 15"></polyline><polyline points="7 9 12 4 17 9"></polyline></svg>
        </button>
      `}

      <div class="brand-dropdown-menu ${state.brandMenu ? 'active' : ''}" id="brandDropdownMenu">
        <div class="brand-search-row">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="brandMenuSearch" placeholder="Search" aria-label="Search communities">
          <button type="button" class="brand-gear-btn" title="Manage communities" aria-label="Manage communities">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </button>
        </div>
        <div class="brand-community-list" id="brandCommunityList">
          ${(state.joinedCommunities || []).length > 0 ? (state.joinedCommunities.map(id => communities.find(c => c.id === id)).filter(Boolean)).map(comm => `
            <div class="brand-community-item" data-action="select-community" data-id="${comm.id}">
              <img src="${comm.cover}" class="brand-comm-avatar" alt="${escapeHTML(comm.title)}">
              <span class="brand-comm-title">${escapeHTML(comm.title)}</span>
            </div>
          `).join('') : ''}
        </div>
        <button class="brand-menu-item" data-action="create">
          <div class="brand-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </div>
          <span>Create a community</span>
        </button>
        <button class="brand-menu-item" data-action="discover">
          <div class="brand-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
          </div>
          <span>Discover communities</span>
        </button>
      </div>
    </div>
  `;

  const isJoined = activeComm ? (state.joinedCommunities || []).includes(activeComm.id) : false;

  const subTabs = (isDetail && isJoined) ? `
    <div class="community-subnav-bar">
      <div class="subnav-container">
        ${['Community', 'Classroom', 'Calendar', 'Members', 'Map', 'Leaderboards', 'About'].map(tab => `
          <button class="subnav-tab ${state.communityTab === tab ? 'active' : ''}" data-action="select-subnav-tab" data-tab="${tab}">${tab}</button>
        `).join('')}
      </div>
    </div>
  ` : '';

  return `
    <header class="topbar-wrapper">
      <div class="topbar-container">
        <div class="topbar-left-group">
          ${brandArea}
          ${topSearch}
        </div>
        <div class="top-actions">
          ${user ? `
            <button class="round-button" data-action="chats" aria-label="Chats">${icon('chat')}<i>1</i></button>
            <button class="round-button" data-action="notifications" aria-label="Notifications">${icon('bell')}<i>3</i></button>
            <div class="profile-control" id="profileControlContainer">
              <button class="avatar" data-action="profile" aria-label="Account menu">${initials()}</button>
              ${profileMenu}
            </div>
          ` : `
            <button class="auth-nav-button" data-action="login">LOG IN</button>
            <button class="auth-nav-button" data-action="register">SIGN UP</button>
          `}
        </div>
      </div>
      ${subTabs}
    </header>
  `;
}

function card(community, index) {
  return `<article class="community-card" style="--accent:${community.accent};--delay:${index * 45}ms" data-community="${community.id}"><div class="card-image"><img src="${community.cover}" alt="${escapeHTML(community.title)} cover"><span class="card-tag">${community.tag}</span></div><div class="card-body"><div class="eyebrow">${community.category} <span>·</span> ${community.accessType === 'Private' ? icon('lock') + ' Private' : 'Open access'}</div><h2>${escapeHTML(community.title)}</h2><p>${escapeHTML(community.description)}</p><footer><span><strong>${community.members}</strong> members</span><span class="price">${community.price}</span></footer></div></article>`;
}

function discoverView() {
  const results = filteredCommunities();
  const resultHeading = state.submittedQuery ? `<div class="result-heading"><span>${results.length} results for <strong>"${escapeHTML(state.submittedQuery)}"</strong></span><button class="filter-button" data-action="filters">Filter ${icon('plus')}</button></div>` : '';
  const hasActiveFilters = state.price !== 'All' || state.access !== 'All' || state.sort !== 'Trending';

  return `<main class="discover-page"><section class="intro"><div><p class="kicker">A better place to belong</p><h1>Discover communities</h1><p class="intro-copy">or <button class="inline-create" data-action="create">create your own</button></p></div></section><section class="catalog-toolbar"><div class="searchbox">${icon('search')}<input id="search" value="${escapeHTML(state.query)}" placeholder="Search communities, topics, people..." aria-label="Search communities"></div><div class="filter-row">${categories.map((category) => `<button class="chip ${state.category === category ? 'selected' : ''}" data-category="${category}">${category}</button>`).join('')}<div class="filter-dropdown-container" id="filterDropdownContainer"><button class="chip filter-dropdown-btn" data-action="toggle-filter-menu" style="border-color:${hasActiveFilters ? 'rgb(61, 91, 169)' : 'inherit'}; font-weight:${hasActiveFilters ? '700' : 'normal'}">Filter <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:4px;"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></button><div class="filter-menu-popup ${state.filterMenu ? 'active' : ''}" id="filterPopup"><div class="filter-grid"><div class="filter-column"><div class="filter-header">Price</div><label class="filter-radio-label"><input type="radio" name="priceFilter" value="All" class="custom-radio" ${state.price === 'All' ? 'checked' : ''} data-filter-type="price"><span>All</span></label><label class="filter-radio-label"><input type="radio" name="priceFilter" value="Free" class="custom-radio" ${state.price === 'Free' ? 'checked' : ''} data-filter-type="price"><span>Free</span></label><label class="filter-radio-label"><input type="radio" name="priceFilter" value="Paid" class="custom-radio" ${state.price === 'Paid' ? 'checked' : ''} data-filter-type="price"><span>Paid</span></label></div><div class="filter-column"><div class="filter-header">Type</div><label class="filter-radio-label"><input type="radio" name="accessFilter" value="All" class="custom-radio" ${state.access === 'All' ? 'checked' : ''} data-filter-type="access"><span>All</span></label><label class="filter-radio-label"><input type="radio" name="accessFilter" value="Private" class="custom-radio" ${state.access === 'Private' ? 'checked' : ''} data-filter-type="access"><span>Private</span></label><label class="filter-radio-label"><input type="radio" name="accessFilter" value="Public" class="custom-radio" ${state.access === 'Public' ? 'checked' : ''} data-filter-type="access"><span>Public</span></label></div><div class="filter-column"><div class="filter-header">Sort</div><label class="filter-radio-label"><input type="radio" name="sortFilter" value="Trending" class="custom-radio" ${state.sort === 'Trending' ? 'checked' : ''} data-filter-type="sort"><span>Trending</span></label><label class="filter-radio-label"><input type="radio" name="sortFilter" value="Top" class="custom-radio" ${state.sort === 'Top' ? 'checked' : ''} data-filter-type="sort"><span>Top</span></label></div></div><div class="filter-footer"><span style="color:#858990; margin-right:6px;">Language</span> English<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;"><polyline points="6 9 12 15 18 9"></polyline></svg></div></div></div></div></section>${resultHeading}<section class="catalog-heading"><div><p class="kicker">Curated for you</p><h2>Communities worth your time <span>${results.length}</span></h2></div><p class="catalog-note">Updated weekly · <b>12,480</b> active members</p></section><div class="community-grid">${results.length ? results.map(card).join('') : `<div class="empty"><strong>No communities found.</strong><p>Try a broader search or reset your filters.</p><button class="outline-button" data-action="reset">Reset filters</button></div>`}</div></main>`;
}

function createCommunityView() {
  const carouselCards = communities.slice(0, 5).map((comm) => {
    let earnings = 'New';
    if (comm.priceType === 'Paid' && comm.members) {
      const numMembers = parseFloat(comm.members) * (comm.members.includes('k') ? 1000 : 1);
      const priceNum = parseFloat(comm.price.replace(/[^0-9.]/g, '')) || 9;
      const estEarnings = Math.round(numMembers * priceNum);
      earnings = `Earns $${estEarnings.toLocaleString()}/month`;
    }
    return {
      id: comm.id,
      title: comm.title,
      badgeText: comm.title,
      earnings: earnings,
      image: comm.cover
    };
  });

  const currentSlide = state.createSlideIndex || 0;

  return `
    <main class="create-community-page">
      <section class="create-community-hero">
        <div class="create-community-container">
          <div class="create-community-logo">
            <span class="logo-text"><span>skill</span>space</span>
          </div>
          <h1 class="create-community-title">Build a community around your passion</h1>
          <h2 class="create-community-subtitle">Get discovered by 30 million users</h2>
          <p class="create-community-stats">Join 200k communities earning $1 billion per year</p>

          <div class="community-carousel-wrapper">
            <div class="community-carousel-deck">
              ${carouselCards.map((cardItem, idx) => {
                let posClass = 'next-slide';
                if (idx === currentSlide) posClass = 'active-slide';
                else if (idx === (currentSlide - 1 + carouselCards.length) % carouselCards.length) posClass = 'prev-slide';

                return `
                  <div class="carousel-card-item ${posClass}" data-slide-index="${idx}">
                    <img src="${cardItem.image}" alt="${escapeHTML(cardItem.title)}" class="carousel-card-img">
                    <div class="carousel-card-badge">
                      <div class="badge-title">${escapeHTML(cardItem.badgeText)}</div>
                      <div class="badge-sub">${escapeHTML(cardItem.earnings)}</div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="carousel-controls">
              <button class="carousel-nav-btn prev-btn" data-action="prev-create-slide" aria-label="Previous slide">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>

              <div class="carousel-dots">
                ${carouselCards.map((_, idx) => `
                  <button class="carousel-dot ${idx === currentSlide ? 'active' : ''}" data-action="select-create-slide" data-slide="${idx}" aria-label="Go to slide ${idx + 1}"></button>
                `).join('')}
              </div>

              <button class="carousel-nav-btn next-btn" data-action="next-create-slide" aria-label="Next slide">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>

          <div class="create-community-action-box">
            <button class="create-community-primary-btn" data-action="start-community-flow">CREATE YOUR COMMUNITY</button>
          </div>
        </div>
      </section>
    </main>
  `;
}

function renderCommunityGrid() {
  const grid = document.querySelector('.community-grid');
  if (!grid) return;
  const results = filteredCommunities();
  grid.innerHTML = results.length ? results.map(card).join('') : `<div class="empty"><strong>No communities found.</strong><p>Try a broader search or reset your filters.</p><button class="outline-button" data-action="reset">Reset filters</button></div>`;
  grid.querySelectorAll('[data-action]').forEach((element) => element.addEventListener('click', () => actions(element.dataset.action)));
}

function detailView() {
  const community = communities.find((item) => item.id === state.selected) || communities[0];
  const isJoined = (state.joinedCommunities || []).includes(community.id);
  const galleryImages = [
    community.cover,
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80'
  ];
  const currentMediaImage = galleryImages[state.selectedMediaIndex] || galleryImages[0];

  const svgIcons = {
    globe: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"></path></svg>',
    users: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    tag: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>',
    user: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
  };

  return `
    <main class="skool-about-page">
      <div class="skool-about-layout">
        <!-- Left Main Content Column -->
        <div class="skool-about-main">
          <!-- Community Header Block -->
          <div class="about-title-block">
            <h1 class="about-community-heading">${escapeHTML(community.title)}</h1>
            <div class="about-star-rating-row">
              <span class="star-gold">★ ★ ★ ★ ★</span>
              <span class="rating-val">${community.rating || '5.0'}</span>
              <span class="review-count-text">· ${community.reviewCount || 93} reviews</span>
            </div>
          </div>

          <!-- Video / Media Screen Container -->
          <div class="media-screen-box">
            <img src="${currentMediaImage}" class="media-screen-img" alt="${escapeHTML(community.title)} presentation">
            <div class="media-play-overlay">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span class="media-timestamp-badge">4:52</span>
          </div>

          <!-- Media Thumbnails Selector Row -->
          <div class="media-thumbs-row">
            ${galleryImages.map((img, idx) => `
              <button class="media-thumb-item ${state.selectedMediaIndex === idx ? 'active' : ''}" data-action="select-media-thumb" data-index="${idx}">
                ${idx === 0 ? `<div class="thumb-play-icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>` : ''}
                <img src="${img}" alt="Thumbnail ${idx + 1}">
              </button>
            `).join('')}
          </div>

          <!-- Professional Meta Bar (No emojis) -->
          <div class="about-meta-bar">
            <div class="meta-item">
              ${svgIcons.globe}
              <span>${escapeHTML(community.accessType)}</span>
            </div>
            <div class="meta-item">
              ${svgIcons.users}
              <span>${escapeHTML(community.members)} members</span>
            </div>
            <div class="meta-item">
              ${svgIcons.tag}
              <span>${escapeHTML(community.price)}</span>
            </div>
            <div class="meta-item">
              ${svgIcons.user}
              <span>By ${escapeHTML(community.creatorName || 'Creator')}</span>
            </div>
          </div>

          <!-- Detailed Exaggerated Paragraphs -->
          <div class="about-copy-section">
            ${(community.aboutParagraphs || []).map(para => `
              <p class="about-paragraph">${escapeHTML(para)}</p>
            `).join('')}

            ${community.highlights ? `
              <ul class="about-check-list">
                ${community.highlights.map(item => `
                  <li>
                    <svg class="check-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>${escapeHTML(item)}</span>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
          </div>

          <!-- Reviews Section -->
          <div class="about-reviews-container">
            <div class="reviews-title-row">
              <span class="star-gold-lg">★</span>
              <h2>${community.rating || '5.0'} · ${community.reviewCount || 93} reviews</h2>
            </div>

            <div class="reviews-cards-list">
              ${(community.reviews || []).map(r => `
                <div class="review-item-card">
                  <div class="review-item-header">
                    <div class="review-user-avatar">${r.author.slice(0, 1).toUpperCase()}</div>
                    <div class="review-user-meta">
                      <div class="review-user-name">${escapeHTML(r.author)} <span class="star-gold-sm">★ ★ ★ ★ ★</span></div>
                      <div class="review-user-sub">${escapeHTML(r.time)} · <span class="member-status-tag">${escapeHTML(r.status)}</span></div>
                    </div>
                  </div>
                  <p class="review-body-text">${escapeHTML(r.text)}</p>
                </div>
              `).join('')}
            </div>

            <button class="see-more-link" data-action="see-more-reviews">See more</button>
          </div>

          <div class="about-footer-legal">
            <a href="#" onclick="return false;">Privacy and terms</a>
          </div>
        </div>

        <!-- Sticky Right Sidebar Card -->
        <aside class="skool-about-sidebar">
          <div class="sticky-sidebar-card">
            <div class="sidebar-cover-header">
              <img src="${community.cover}" alt="${escapeHTML(community.title)} cover">
            </div>

            <div class="sidebar-card-content">
              <h2 class="sidebar-comm-title">${escapeHTML(community.title)}</h2>
              <div class="sidebar-comm-url">skillspace.in/${community.slug || 'community'}</div>
              <p class="sidebar-comm-desc">${escapeHTML(community.description)}</p>

              <div class="sidebar-stats-row">
                <div class="stat-col">
                  <strong>${community.members}</strong>
                  <span>Members</span>
                </div>
                <div class="stat-col">
                  <strong>${community.onlineCount || '324'}</strong>
                  <span>Online</span>
                </div>
                <div class="stat-col">
                  <strong>${community.adminsCount || '12'}</strong>
                  <span>Admins</span>
                </div>
              </div>

              <!-- Avatar Stack -->
              <div class="sidebar-avatar-stack">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/men/45.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/women/24.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/men/22.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/women/12.jpg" class="stack-avatar" alt="">
              </div>

              <!-- Prominent Join Group Button -->
              <button class="skool-join-button ${isJoined ? 'joined' : ''}" data-action="${isJoined ? 'leave' : 'join'}">
                ${isJoined ? '✓ JOINED' : 'JOIN GROUP'}
              </button>

              <div class="sidebar-powered-by">
                Powered by <strong>skillspace</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  `;
}

function getContributionData(selectedGroup = 'All communities') {
  const today = new Date('2026-09-03T12:00:00Z');
  const days = [];
  let totalContributions = 0;

  let seed = 0;
  for (let i = 0; i < selectedGroup.length; i++) seed = (seed * 31 + selectedGroup.charCodeAt(i)) % 10007;

  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const dayOfWeek = d.getDay();
    const val = Math.sin(i * 0.18 + seed) * 10 + Math.cos(i * 0.42 + seed) * 5;
    
    let count = 0;
    if (val > 5.5 && dayOfWeek !== 0 && dayOfWeek !== 6) {
      count = Math.floor((val - 4.5) * 0.75) + 1;
    } else if (val > 11) {
      count = 1;
    }
    if (selectedGroup !== 'All communities' && (i % 2 === 0)) {
      count = Math.max(0, Math.floor(count * 0.6));
    }
    
    totalContributions += count;
    let level = 0;
    if (count >= 5) level = 4;
    else if (count >= 3) level = 3;
    else if (count >= 2) level = 2;
    else if (count >= 1) level = 1;

    days.push({ dateStr, count, level });
  }
  return { days, totalContributions };
}

function profileView() {
  const user = store.user || {
    name: 'Prajwal Ramagiri',
    email: 'ramagiri.prajwal@gmail.com',
    username: 'prajwal-ramagiri-6593',
    bio: '- nil -',
    joinDate: '2026-08-15',
    pfp: null
  };

  const selectedGroup = state.selectedContributionGroup || 'All communities';
  const { days, totalContributions } = getContributionData(selectedGroup);

  const usernameHandle = `@${(user.username || user.name || 'user').toLowerCase().replace(/\s+/g, '-')}`;
  const joinDateText = user.joinDate
    ? new Date(user.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Aug 15, 2026';
  const userInitial = initials(user);

  return `
    <main class="profile-page-container">
      <div class="profile-layout">
        <!-- Left Column: Activity & Memberships -->
        <div class="profile-main-column">
          <!-- Activity Heatmap Section -->
          <div class="profile-section-card">
            <h2 class="profile-section-title">Activity</h2>
            <div class="heatmap-container" style="position:relative;">
              <div class="heatmap-header">
                <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
                <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
              </div>
              <div class="heatmap-grid-wrapper">
                <div class="heatmap-day-labels">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                  <span>Sun</span>
                </div>
                <div class="heatmap-squares-grid" id="heatmapGrid">
                  ${days.map(d => `<div class="heatmap-square level-${d.level}" data-date="${d.dateStr}" data-count="${d.count}"></div>`).join('')}
                </div>
              </div>
              <div class="heatmap-footer">
                <span class="text-secondary" style="font-size: 13px; cursor:pointer;" title="Contributions made across joined communities over the past year">What is this?</span>
                <div class="heatmap-legend">
                  <span>Less</span>
                  <span class="legend-sq level-0"></span>
                  <span class="legend-sq level-1"></span>
                  <span class="legend-sq level-2"></span>
                  <span class="legend-sq level-3"></span>
                  <span class="legend-sq level-4"></span>
                  <span>More</span>
                </div>
              </div>
              <div class="heatmap-cell-tooltip" id="heatmapTooltip"></div>
            </div>
          </div>

          <!-- Memberships Section -->
          <div class="profile-section-card">
            <h2 class="profile-section-title">Memberships</h2>
            <div class="empty-state-box">
              <p class="text-secondary" style="margin:0; font-size:14px;">No memberships yet. Join a community to get started!</p>
            </div>
          </div>

          <!-- Contributions Section -->
          <div class="profile-section-card">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h2 class="profile-section-title" style="margin-bottom: 0;">Contributions</h2>
              <div style="display: flex; gap: 8px; align-items: center;">
                <select class="profile-select-dropdown" id="profileContributionSelect">
                  <option value="All communities" ${selectedGroup === 'All communities' ? 'selected' : ''}>All communities</option>
                  <option value="AI Video Bootcamp" ${selectedGroup === 'AI Video Bootcamp' ? 'selected' : ''}>AI Video Bootcamp</option>
                  <option value="CapCut Creator Bootcamp" ${selectedGroup === 'CapCut Creator Bootcamp' ? 'selected' : ''}>CapCut Creator Bootcamp</option>
                  <option value="AI Automation Agency Bootcamp" ${selectedGroup === 'AI Automation Agency Bootcamp' ? 'selected' : ''}>AI Automation Agency Bootcamp</option>
                  <option value="The Creators Hub" ${selectedGroup === 'The Creators Hub' ? 'selected' : ''}>The Creators Hub</option>
                </select>
                <button class="profile-icon-filter" aria-label="Filter contributions">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: User Bio Card -->
        <div class="profile-sidebar-column">
          <div class="user-bio-card">
            <div class="bio-avatar-container">
              ${user.pfp ? `<img src="${user.pfp}" alt="Avatar" class="bio-avatar-img">` : `<div class="user-avatar-initial large">${userInitial}</div>`}
            </div>
            <h2 class="bio-user-name">${escapeHTML(user.name || 'Prajwal Ramagiri')}</h2>
            <div class="bio-user-handle">${usernameHandle}</div>
            <div class="bio-user-text">${escapeHTML(user.bio || '- nil -')}</div>

            <div class="bio-status-row">
              <span class="online-indicator-dot"></span>
              <span>Online now</span>
            </div>

            <div class="bio-joined-row">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>Joined ${joinDateText}</span>
            </div>

            <div class="bio-stats-grid">
              <div class="bio-stat-item">
                <div class="stat-num" id="userContributionStat">${totalContributions}</div>
                <div class="stat-lbl">Contributions</div>
              </div>
              <div class="bio-stat-item">
                <div class="stat-num">0</div>
                <div class="stat-lbl">Followers</div>
              </div>
              <div class="bio-stat-item">
                <div class="stat-num">0</div>
                <div class="stat-lbl">Following</div>
              </div>
            </div>

            <button class="edit-profile-btn" data-action="settings">EDIT PROFILE</button>
          </div>

          <div class="powered-by-tag">
            Powered by <strong>SkillSpace</strong>
          </div>
        </div>
      </div>
    </main>
  `;
}

function renderSettingsTabContent() {
  const user = store.user || { name: 'Prajwal Ramagiri', email: 'ramagiri.prajwal@gmail.com', bio: '- nil -' };
  const nameParts = (user.name || 'Prajwal Ramagiri').split(' ');
  const firstName = nameParts[0] || 'Prajwal';
  const lastName = nameParts.slice(1).join(' ') || 'Ramagiri';
  const username = user.username || `${firstName.toLowerCase()}-${lastName.toLowerCase()}-6593`;
  const email = user.email || 'ramagiri.prajwal@gmail.com';
  const userInitial = initials(user);
  const currentTab = (state.settingsTab || 'profile').toLowerCase();

  switch (currentTab) {
    case 'profile':
      return `
        <h2 class="settings-panel-title">Profile</h2>
        <div class="settings-avatar-row">
          ${user.pfp ? `<img src="${user.pfp}" alt="Avatar" class="settings-avatar-img">` : `<div class="user-avatar-initial medium">${userInitial}</div>`}
          <button type="button" class="settings-blue-link" data-action="change-photo">Change profile photo</button>
        </div>

        <form id="profileSettingsForm">
          <div class="settings-form-row-2">
            <div class="skool-field-container">
              <label class="skool-floating-label">First Name</label>
              <input type="text" class="skool-input" id="setFirstName" value="${escapeHTML(firstName)}" required>
            </div>
            <div class="skool-field-container">
              <label class="skool-floating-label">Last Name</label>
              <input type="text" class="skool-input" id="setLastName" value="${escapeHTML(lastName)}" required>
            </div>
          </div>
          <div class="settings-field-hint">You can only change your name once, and you must use your real name. <button type="button" class="settings-blue-link">Change name</button></div>

          <div class="skool-field-container" style="margin-top: 16px;">
            <label class="skool-floating-label">URL</label>
            <input type="text" class="skool-input" id="setUrl" value="skillspace.com/@${escapeHTML(username)}">
          </div>
          <div class="settings-field-hint">You can change your URL once you've got 90 contributions, 30 followers, and been using it for 90 days.</div>

          <div class="skool-field-container" style="margin-top: 16px;">
            <label class="skool-floating-label">Bio</label>
            <textarea class="skool-textarea" id="setBio" rows="3" maxlength="150">${escapeHTML(user.bio || '- nil -')}</textarea>
            <div class="textarea-char-count" id="bioCharCount">${(user.bio || '- nil -').length} / 150</div>
          </div>

          <div class="skool-field-container">
            <label class="skool-floating-label">Location</label>
            <input type="text" class="skool-input" id="setLocation" placeholder="Location" value="${escapeHTML(user.location || '')}">
          </div>

          <div class="settings-location-links">
            <span class="settings-blue-icon-link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> Change my map location</span>
            <span class="settings-muted-link">Remove my map location</span>
          </div>

          <div class="skool-field-container">
            <label class="skool-floating-label">Myers Briggs</label>
            <select class="skool-select">
              <option>Don't show</option>
              <option>INTJ</option><option>INTP</option><option>ENTJ</option><option>ENTP</option>
              <option>INFJ</option><option>INFP</option><option>ENFJ</option><option>ENFP</option>
            </select>
          </div>

          <div class="settings-accordion-item">
            <span>Social links</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          <div class="settings-accordion-item">
            <span>Membership visibility</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          <div class="settings-accordion-item">
            <span>Advanced</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          <button type="submit" class="settings-submit-gold-btn">UPDATE PROFILE</button>
        </form>
      `;

    case 'communities':
      return `
        <h2 class="settings-panel-title">Communities</h2>
        <p class="text-secondary" style="font-size: 14px; margin-bottom: 20px;">Drag and drop to reorder, pin to sidebar, or hide.</p>
        <div class="empty-state-box">
          <p class="text-secondary" style="margin:0;">No communities joined yet.</p>
        </div>
      `;

    case 'affiliates':
      return `
        <h2 class="settings-panel-title">Affiliates</h2>
        <p class="text-secondary" style="font-size: 14px; margin-bottom: 24px;">Earn commission for life when you invite somebody to create or join a SkillSpace community.</p>

        <div class="affiliates-stats-grid">
          <div class="affiliate-stat-card">
            <div class="affiliate-stat-val">$0</div>
            <div class="affiliate-stat-lbl">Last 30 days</div>
          </div>
          <div class="affiliate-stat-card">
            <div class="affiliate-stat-val">$0</div>
            <div class="affiliate-stat-lbl">Lifetime</div>
          </div>
          <div class="affiliate-stat-card">
            <div class="affiliate-stat-val" style="color:rgb(61, 91, 169);">$0</div>
            <div class="affiliate-stat-lbl">Account balance</div>
          </div>
          <button class="affiliate-payout-btn" disabled>PAYOUT</button>
        </div>
        <div style="text-align:right; font-size:12px; color:var(--text-muted-sub); margin-bottom:24px;">$0 available soon</div>

        <div class="settings-subhead">Your affiliate links</div>
        <div style="margin-bottom: 12px;">
          <span class="affiliate-pill">SkillSpace platform</span>
        </div>
        <p class="text-secondary" style="font-size: 13px; margin-bottom: 12px;">Earn <strong>40% commission</strong> when you invite somebody to create a SkillSpace community.</p>

        <div class="affiliate-link-row">
          <input type="text" class="skool-input" id="affiliateLinkInput" value="https://www.skillspace.com/signup?ref=4766f260f33d403ba7679753e291b7ab" readonly>
          <button class="affiliate-copy-btn" data-action="copy-affiliate-link">COPY</button>
        </div>

        <div class="empty-state-box" style="margin-top: 24px; padding: 48px 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="26" fill="rgb(61, 91, 169)" stroke="#1E293B" stroke-width="4"/>
            <circle cx="30" cy="30" r="21" fill="rgb(48, 73, 140)" stroke="#1E293B" stroke-width="2.5"/>
            <text x="30" y="38" font-family="'Inter', -apple-system, sans-serif" font-size="26" font-weight="900" fill="#FFFFFF" text-anchor="middle">$</text>
          </svg>
          <p class="text-secondary" style="margin: 0; font-size: 14px;">Your referrals will show here</p>
        </div>
      `;

    case 'payouts':
      return `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <h2 class="settings-panel-title">Payouts</h2>
          <button class="profile-icon-filter" aria-label="Payout settings"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button>
        </div>
        <p class="text-secondary" style="font-size: 14px; margin-bottom: 24px;">Payouts for community and affiliate earnings.</p>
        <p class="text-secondary" style="font-size: 14px;">No payouts yet</p>
      `;

    case 'account':
      return `
        <h2 class="settings-panel-title">Account</h2>

        <div class="account-setting-row">
          <div>
            <div class="account-setting-label">Email</div>
            <div class="account-setting-val">${escapeHTML(email)}</div>
          </div>
          <button class="account-action-btn" data-action="change-email">CHANGE EMAIL</button>
        </div>

        <div class="account-setting-row">
          <div>
            <div class="account-setting-label">Password</div>
            <div class="account-setting-val text-muted">Change your password</div>
          </div>
          <button class="account-action-btn" data-action="change-password">CHANGE PASSWORD</button>
        </div>

        <div class="skool-field-container" style="margin-top: 24px;">
          <label class="skool-floating-label">Language</label>
          <select class="skool-select">
            <option>US English</option>
            <option>UK English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>

        <div class="skool-field-container">
          <label class="skool-floating-label">Timezone</label>
          <select class="skool-select">
            <option>(GMT +05:30) Asia/Calcutta</option>
            <option>(GMT +00:00) UTC</option>
            <option>(GMT -05:00) Eastern Time</option>
          </select>
        </div>

        <div class="account-setting-row" style="border-bottom: none; margin-top: 24px;">
          <div>
            <div class="account-setting-label">Log out of all devices</div>
            <div class="account-setting-val text-muted">Log out of all active sessions on all devices.</div>
          </div>
          <button class="account-action-btn" data-action="logout-everywhere">LOG OUT EVERYWHERE</button>
        </div>
      `;

    case 'notifications':
      return `
        <h2 class="settings-panel-title">Notifications</h2>

        <div class="setting-toggle-row">
          <span class="toggle-row-label">New follower</span>
          <label class="skool-toggle-switch">
            <input type="checkbox" checked>
            <span class="skool-toggle-slider"></span>
          </label>
        </div>

        <div class="setting-toggle-row">
          <span class="toggle-row-label">Likes</span>
          <label class="skool-toggle-switch">
            <input type="checkbox" checked>
            <span class="skool-toggle-slider"></span>
          </label>
        </div>

        <div class="setting-toggle-row">
          <span class="toggle-row-label">Ka-ching</span>
          <label class="skool-toggle-switch">
            <input type="checkbox" checked>
            <span class="skool-toggle-slider"></span>
          </label>
        </div>

        <div class="setting-toggle-row" style="border-bottom: none;">
          <span class="toggle-row-label">Affiliate referral</span>
          <label class="skool-toggle-switch">
            <input type="checkbox" checked>
            <span class="skool-toggle-slider"></span>
          </label>
        </div>
      `;

    case 'chat':
      return `
        <div class="setting-toggle-header-row">
          <div>
            <h2 class="settings-panel-title" style="margin-bottom: 4px;">Notifications</h2>
            <p class="text-secondary" style="font-size: 13px;">Notify me with sound and blinking tab header when somebody messages me.</p>
          </div>
          <label class="skool-toggle-switch">
            <input type="checkbox" checked>
            <span class="skool-toggle-slider"></span>
          </label>
        </div>

        <div class="setting-toggle-header-row" style="margin-top: 24px;">
          <div>
            <h2 class="settings-panel-title" style="margin-bottom: 4px;">Email notifications</h2>
            <p class="text-secondary" style="font-size: 13px;">If you're offline and somebody messages you, we'll let you know via email. We won't email you if you're online.</p>
          </div>
          <label class="skool-toggle-switch">
            <input type="checkbox" checked>
            <span class="skool-toggle-slider"></span>
          </label>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-sub);">
          <h2 class="settings-panel-title" style="margin-bottom: 6px;">Who can message me?</h2>
          <p class="text-secondary" style="font-size: 13px;">Only members in the group you're in can message you. You choose what group users can message you from by turning your chat on/off below.</p>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-sub);">
          <h2 class="settings-panel-title" style="margin-bottom: 6px;">Blocked users</h2>
          <p class="text-secondary" style="font-size: 14px;">You have no blocked users.</p>
        </div>
      `;

    case 'payment-methods':
      return `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h2 class="settings-panel-title" style="margin-bottom: 0;">Payment methods</h2>
          <button class="settings-submit-gold-btn" style="margin-top: 0;" data-action="add-payment-method">ADD PAYMENT METHOD</button>
        </div>
        <p class="text-secondary" style="font-size: 14px;">No cards on file</p>
      `;

    case 'payment-history':
      return `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <h2 class="settings-panel-title">Payment history</h2>
          <button class="profile-icon-filter" aria-label="Filter payments"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button>
        </div>
        <p class="text-secondary" style="font-size: 14px;">You have no payments.</p>
      `;

    case 'theme':
      return `
        <h2 class="settings-panel-title">Theme</h2>
        <div class="skool-field-container" style="margin-bottom: 24px;">
          <label class="skool-floating-label">Theme</label>
          <select class="skool-select" id="themeSelector">
            <option value="light" ${state.themeMode === 'light' ? 'selected' : ''}>Light (default)</option>
            <option value="dark" ${state.themeMode === 'dark' ? 'selected' : ''}>Dark</option>
          </select>
        </div>
        <button type="button" class="settings-submit-gold-btn" data-action="save-theme">SAVE</button>
      `;

    default:
      return `
        <h2 class="settings-panel-title">${currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}</h2>
        <p class="text-secondary">Settings for ${currentTab} configured here.</p>
      `;
  }
}

function settingsView() {
  const tabs = [
    { id: 'communities', name: 'Communities' },
    { id: 'profile', name: 'Profile' },
    { id: 'affiliates', name: 'Affiliates' },
    { id: 'payouts', name: 'Payouts' },
    { id: 'account', name: 'Account' },
    { id: 'notifications', name: 'Notifications' },
    { id: 'chat', name: 'Chat' },
    { id: 'payment-methods', name: 'Payment methods' },
    { id: 'payment-history', name: 'Payment history' },
    { id: 'theme', name: 'Theme' }
  ];

  const activeTabId = (state.settingsTab || 'profile').toLowerCase();

  return `
    <main class="settings-page-container">
      <div class="settings-layout">
        <div class="settings-sidebar">
          ${tabs.map(tab => `
            <button class="settings-nav-item ${activeTabId === tab.id ? 'active' : ''}" data-settings="${tab.id}">
              ${tab.name}
            </button>
          `).join('')}
        </div>
        <div class="settings-content-panel">
          ${renderSettingsTabContent()}
        </div>
      </div>
    </main>
  `;
}

function selectPlanView() {
  const isYearly = state.planBilling === 'yearly';
  const hobbyPrice = isYearly ? '$7.50' : '$9';
  const proPrice = isYearly ? '$82' : '$99';

  return `
    <main class="select-plan-page">
      <div class="select-plan-container">
        <h1 class="plan-page-title">Select your plan</h1>
        
        <div class="plan-toggle-wrapper">
          <div class="plan-toggle-container">
            <button class="plan-toggle-btn ${!isYearly ? 'active' : ''}" data-action="toggle-plan-billing" data-billing="monthly">Monthly</button>
            <div class="plan-toggle-yearly-box">
              <span class="plan-free-badge">2 months free!</span>
              <button class="plan-toggle-btn ${isYearly ? 'active' : ''}" data-action="toggle-plan-billing" data-billing="yearly">Yearly</button>
            </div>
          </div>
        </div>

        <div class="plan-cards-grid">
          <!-- Hobby Card -->
          <div class="plan-card">
            <div class="plan-card-header">
              <h2 class="plan-card-name">Hobby</h2> <div class="plan-card-price">${hobbyPrice}<span class="plan-price-period">/month</span></div>
            </div>

            <ul class="plan-features-list">
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> members</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> courses</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> videos</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> live calls</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon muted">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>10%</strong> transaction fee</span>
              </li>
              <li class="plan-feature-item disabled">
                <span class="plan-cross-icon">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </span>
                <span>Custom URL</span>
              </li>
              <li class="plan-feature-item disabled">
                <span class="plan-cross-icon">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </span>
                <span>Affiliates</span>
              </li>
            </ul>

            <button class="plan-cta-button" data-action="select-plan" data-plan="Hobby">TRY FOR FREE</button>
          </div>

          <!-- Pro Card -->
          <div class="plan-card pro">
            <div class="plan-card-header">
              <h2 class="plan-card-name">Pro</h2> <div class="plan-card-price">${proPrice}<span class="plan-price-period">/month</span></div>
            </div>

            <ul class="plan-features-list">
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> members</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> courses</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> videos</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> live calls</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>2.9%</strong> transaction fee</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span>Custom URL</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span>Affiliates</span>
              </li>
            </ul>

            <button class="plan-cta-button" data-action="select-plan" data-plan="Pro">TRY FOR FREE</button>
          </div>
        </div>
      </div>
    </main>
  `;
}

function modalCardContent() {
  if (state.modal === 'plan') {
    return planModalContent();
  }
  const mode = state.authMode;
  if (mode === 'sent') return `<section class="login-modal-card" role="dialog" aria-modal="true" onclick="event.stopPropagation()"><button class="modal-close" data-action="close-modal">&times;</button><h2 class="login-modal-title">Please check your email</h2><p class="auth-copy" style="color:#d4d4d4; text-align:center;">We sent you an email, which contains a link to reset your SkillSpace password.</p><button class="SkillSpace-btn-primary" data-auth="login">BACK TO LOGIN</button></section>`;
  const register = mode === 'register';
  const forgot = mode === 'forgot';
  const message = `<p class="auth-message ${state.authMessage ? state.authMessage.type : 'empty'}" aria-live="polite" style="margin-bottom:12px; text-align:center;">${state.authMessage ? escapeHTML(state.authMessage.text) : ''}</p>`;
  
  if (register) {
    return `
      <div class="login-modal-card" role="dialog" aria-modal="true" onclick="event.stopPropagation()">
        <button class="modal-close" data-action="close-modal">&times;</button>
        <h2 class="login-modal-title">Create your SkillSpace account</h2>
        ${message}
        <form id="authForm">
          <div class="settings-form-row-2">
            <div class="skool-field-container">
              <label class="skool-floating-label">First Name</label>
              <input type="text" name="firstName" class="skool-input" required placeholder="">
            </div>
            <div class="skool-field-container">
              <label class="skool-floating-label">Last Name</label>
              <input type="text" name="lastName" class="skool-input" required placeholder="">
            </div>
          </div>
          <div class="skool-field-container">
            <label class="skool-floating-label">Email</label>
            <input type="email" name="email" class="skool-input" required placeholder="">
          </div>
          <div class="skool-field-container">
            <label class="skool-floating-label">Password</label>
            <input type="password" name="password" class="skool-input" minlength="8" required placeholder="">
          </div>
          <div class="skool-field-container">
            <label class="skool-floating-label">Confirm Password</label>
            <input type="password" name="confirmPassword" class="skool-input" minlength="8" required placeholder="">
          </div>
          <p class="terms" style="color:#858990; font-size:12px; margin-bottom:16px;">By signing up, you accept our <u style="color:#aaa">terms</u> and <u style="color:#aaa">privacy policy</u>.</p>
          <button type="submit" class="SkillSpace-btn-primary">SIGN UP</button>
          <div class="login-modal-footer">
            Already have an account? <button type="button" class="SkillSpace-link" data-auth="login">Log in</button>
          </div>
        </form>
      </div>
    `;
  }

  if (forgot) {
    return `
      <div class="login-modal-card" role="dialog" aria-modal="true" onclick="event.stopPropagation()">
        <button class="modal-close" data-action="close-modal">&times;</button>
        <h2 class="login-modal-title">Forgot Password</h2>
        ${message}
        <p class="auth-copy" style="color:#d4d4d4; text-align:center; margin-bottom:18px;">Enter your email and we'll send you a link to reset your password.</p>
        <form id="forgotForm">
          <div class="skool-field-container">
            <label class="skool-floating-label">Email</label>
            <input name="email" type="email" class="skool-input" required placeholder="">
          </div>
          <button type="submit" class="SkillSpace-btn-primary" style="margin-top:12px;">EMAIL ME</button>
          <div class="login-modal-footer">
            <button type="button" class="SkillSpace-link" data-auth="login">Back to login</button>
          </div>
        </form>
      </div>
    `;
  }

  return `
    <div class="login-modal-card" role="dialog" aria-modal="true" onclick="event.stopPropagation()">
      <button class="modal-close" data-action="close-modal">&times;</button>
      <h2 class="login-modal-title">Log in to Skill Space</h2>
      ${message}
      <form id="authForm">
        <div class="skool-field-container">
          <label class="skool-floating-label">Email</label>
          <input type="email" name="email" id="modalEmail" class="skool-input" required placeholder="">
        </div>
        <div class="skool-field-container">
          <label class="skool-floating-label">Password</label>
          <input type="password" name="password" id="modalPassword" class="skool-input" required placeholder="">
        </div>
        <div class="login-sublinks-row">
          <button type="button" class="SkillSpace-link" data-auth="forgot">Forgot password?</button>
          <button type="button" class="SkillSpace-link" data-auth="login">Log in with a code</button>
        </div>
        <button type="submit" class="SkillSpace-btn-primary">LOG IN</button>
        <div class="login-modal-footer">
          Don't have an account? <button type="button" class="SkillSpace-link" data-auth="register">Sign up for free</button>
        </div>
      </form>
    </div>
  `;
}

function modal() {
  if (!state.modal) return '';
  return `<div class="modal-backdrop">${modalCardContent()}</div>`;
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
      showToast(`🎉 Selected ${planName} plan! Setting up your community...`);
    };
  });

  backdrop.onclick = (event) => {
    if (event.target === backdrop) closeAuthModal();
  };

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
      closeAuthModal();
      refreshHeader();
      showToast('Welcome back');
    };
  }
}

function render() {
  const app = document.querySelector('#app');
  const body = state.view === 'discover' ? discoverView() : state.view === 'create-community' ? createCommunityView() : state.view === 'select-plan' ? selectPlanView() : state.view === 'detail' ? detailView() : state.view === 'profile' ? profileView() : settingsView();
  app.innerHTML = `${header()}${body}<div class="toast" id="toast"></div>`;
  document.body.classList.toggle('theme-dark', state.themeMode === 'dark');
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

  document.querySelector('[data-community]')?.parentElement.addEventListener('click', (event) => { const cardElement = event.target.closest('[data-community]'); if (cardElement && !event.target.closest('button')) { state.selected = Number(cardElement.dataset.community); state.view = 'detail'; render(); } });
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
    const menu = document.querySelector('#brandDropdownMenu');
    if (menu) {
      state.brandMenu = !state.brandMenu;
      menu.classList.toggle('active', state.brandMenu);
    }
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
  } else if (action === 'select-plan') {
    const selectedPlan = element?.dataset.plan || 'Pro';
    showToast(`🎉 Selected ${selectedPlan} plan! Setting up your community...`);
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
      const menu = document.querySelector('#userProfileMenu');
      if (menu) {
        state.profileMenu = !state.profileMenu;
        menu.classList.toggle('active', state.profileMenu);
      }
    }
  } else if (action === 'toggle-filter-menu') {
    const popup = document.querySelector('#filterPopup');
    if (popup) {
      state.filterMenu = !state.filterMenu;
      popup.classList.toggle('active', state.filterMenu);
    }
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
    state.view = 'discover';
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
    showToast(`${chats.length} conversations waiting`);
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
    const id = Number(element?.dataset.id || 1);
    state.selected = id;
    state.view = 'detail';
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
  }
}
restoreSession();
render();