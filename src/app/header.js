/**
 * Shared application header and navigation rendering.
 */
export function createHeader({ state, store, communities, isVisibleCommunity, escapeHTML, addImageIcon, initials, icon, chatItems, unreadChatCount }) {
function header() {
  const user = store.user;
  const activeComm = state.selected ? (communities.find(c => c.id === state.selected) || communities[0]) : null;
  const isDetail = state.view === 'detail' || state.view === 'creator-community';

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

  const backButton = state.view === 'detail' ? `
    <button class="topbar-back-btn" data-action="discover" title="Go back to Home" aria-label="Go back to home page">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
    </button>
  ` : '';

  const brandArea = `
    <div class="brand-container" id="brandContainer">
      ${backButton}
      ${isDetail && activeComm ? `
        <div class="community-header-brand" data-action="toggle-brand-menu">
          ${activeComm.creatorAvatar || activeComm.cover ? `<img src="${activeComm.creatorAvatar || activeComm.cover}" class="community-brand-icon" alt="">` : `<span class="community-brand-icon community-brand-icon-placeholder">${addImageIcon()}</span>`}
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
          ${(state.joinedCommunities || []).length > 0 ? (state.joinedCommunities.map(id => communities.find(c => c.id === id)).filter(Boolean).filter(isVisibleCommunity)).map(comm => `
            <div class="brand-community-item" data-action="select-community" data-id="${comm.id}">
              ${comm.cover ? `<img src="${comm.cover}" class="brand-comm-avatar" alt="${escapeHTML(comm.title)}">` : `<span class="brand-comm-avatar brand-comm-avatar-placeholder">${addImageIcon()}</span>`}
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

  const subnavTabs = state.view === 'creator-community'
    ? ['Community', 'Classroom', 'Members', 'Leaderboards', 'About']
    : ['Community', 'Classroom', 'Calendar', 'Members', 'Map', 'Leaderboards', 'About'];
  const subTabs = (isDetail && (isJoined || state.view === 'creator-community')) ? `
    <div class="community-subnav-bar">
      <div class="subnav-container">
        ${subnavTabs.map(tab => `
          <button class="subnav-tab ${state.communityTab === tab ? 'active' : ''}" data-action="select-subnav-tab" data-tab="${tab}">${tab}</button>
        `).join('')}
      </div>
    </div>
  ` : '';

  return `
    <header class="topbar-wrapper ${state.view === 'creator-community' ? 'creator-topbar' : ''}">
      <div class="topbar-container">
        <div class="topbar-left-group">
          ${brandArea}
          ${isDetail ? topSearch : ''}
        </div>
        <div class="top-actions">
          ${user ? `
            <div class="chat-control" id="chatControlContainer">
              <button class="round-button" data-action="chats" aria-label="Chats" aria-expanded="${state.chatMenu}">${icon('chat')}${unreadChatCount ? `<i>${unreadChatCount}</i>` : ''}</button>
              <section class="chat-menu${state.chatMenu ? ' active' : ''}" id="chatMenu" aria-label="Chats">
                <div class="chat-menu-header"><strong>Chats</strong><button type="button" class="chat-read-link" data-action="mark-chats-read">Mark all as read</button><button type="button" class="chat-filter-button">All <span>⌄</span></button></div>
                <label class="chat-search"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg><input type="search" placeholder="Search users" aria-label="Search users"></label>
                <div class="chat-list">${chatItems.map((chat) => `<button type="button" class="chat-row${chat.unread ? ' unread' : ''}"><img src="${chat.avatar}" alt=""><span class="chat-row-content"><strong>${escapeHTML(chat.member.name)}${chat.unread ? ` <em>(1)</em>` : ''} <small>• ${escapeHTML(chat.time)}</small></strong><span>${escapeHTML(chat.text)}</span></span>${chat.unread ? '<i class="chat-unread-dot"></i>' : ''}</button>`).join('')}</div>
              </section>
            </div>
            <button class="round-button" data-action="notifications" aria-label="Notifications">${icon('bell')}<i>3</i></button>
            <div class="profile-control" id="profileControlContainer">
              <button class="avatar" data-action="profile" aria-label="Account menu">${initials(store.user)}</button>
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

  return { header };
}
