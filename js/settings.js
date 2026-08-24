// js/settings.js

let activeSettingsTab = 'profile';

function closeAllPages() {
  closeAllDropdowns();
  const mainContent = document.querySelector('.main-content');
  const profileView = document.getElementById('profilePageView');
  const settingsView = document.getElementById('settingsPageView');

  if (profileView) profileView.classList.add('hidden');
  if (settingsView) settingsView.classList.add('hidden');
  if (mainContent) mainContent.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openSettingsPage() {
  openSettingsTab('profile');
}

function openSettingsTab(tabName) {
  closeAllDropdowns();
  if (!isLoggedIn || !currentUser) {
    openLoginModal();
    return;
  }

  activeSettingsTab = tabName;
  const mainContent = document.querySelector('.main-content');
  const profileView = document.getElementById('profilePageView');
  const settingsView = document.getElementById('settingsPageView');

  if (mainContent) mainContent.classList.add('hidden');
  if (profileView) profileView.classList.add('hidden');
  if (settingsView) {
    settingsView.classList.remove('hidden');
    renderSettingsPage();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderSettingsPage() {
  const settingsView = document.getElementById('settingsPageView');
  if (!settingsView || !currentUser) return;

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

  settingsView.innerHTML = `
    <div class="settings-layout">
      <!-- Left Sidebar Navigation -->
      <div class="settings-sidebar">
        ${tabs.map(tab => `
          <button class="settings-nav-item ${activeSettingsTab === tab.id ? 'active' : ''}" onclick="switchSettingsTab('${tab.id}')">
            ${tab.name}
          </button>
        `).join('')}
      </div>

      <!-- Right Main Content Panel -->
      <div class="settings-content-panel">
        ${renderSettingsTabContent()}
      </div>
    </div>
  `;
}

function switchSettingsTab(tabId) {
  activeSettingsTab = tabId;
  renderSettingsPage();
}

function renderSettingsTabContent() {
  const firstName = currentUser.name ? currentUser.name.split(' ')[0] : 'Prajwal';
  const lastName = currentUser.name && currentUser.name.split(' ').length > 1 ? currentUser.name.split(' ').slice(1).join(' ') : 'Ramagiri';
  const username = currentUser.username || `prajwal-ramagiri-6593`;
  const email = currentUser.email || 'ramagiri.prajwal@gmail.com';
  const userInitial = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : (currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'U');

  switch (activeSettingsTab) {
    case 'profile':
      return `
        <h2 class="settings-panel-title">Profile</h2>
        
        <div class="settings-avatar-row">
          ${currentUser.pfp
          ? `<img src="${currentUser.pfp}" alt="Avatar" class="settings-avatar-img">`
          : `<div class="user-avatar-initial medium">${userInitial}</div>`
        }
          <a class="settings-blue-link" onclick="alert('Photo uploader')">Change profile photo</a>
        </div>

        <form onsubmit="handleUpdateProfileSettings(event)">
          <div class="settings-form-row-2">
            <div class="skool-field-container">
              <label class="skool-floating-label">First Name</label>
              <input type="text" class="skool-input" id="setFirstName" value="${firstName}">
            </div>
            <div class="skool-field-container">
              <label class="skool-floating-label">Last Name</label>
              <input type="text" class="skool-input" id="setLastName" value="${lastName}">
            </div>
          </div>
          <div class="settings-field-hint">You can only change your name once, and you must use your real name. <a class="settings-blue-link">Change name</a></div>

          <div class="skool-field-container" style="margin-top: 16px;">
            <label class="skool-floating-label">URL</label>
            <input type="text" class="skool-input" id="setUrl" value="skillspace.com/@${username}">
          </div>
          <div class="settings-field-hint">You can change your URL once you've got 90 contributions, 30 followers, and been using it for 90 days.</div>

          <div class="skool-field-container" style="margin-top: 16px;">
            <label class="skool-floating-label">Bio</label>
            <textarea class="skool-textarea" id="setBio" rows="3">- nil -</textarea>
            <div class="textarea-char-count">8 / 150</div>
          </div>

          <div class="skool-field-container">
            <label class="skool-floating-label">Location</label>
            <input type="text" class="skool-input" id="setLocation" placeholder="Location">
          </div>

          <div class="settings-location-links">
            <a class="settings-blue-icon-link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> Change my map location</a>
            <a class="settings-muted-link">Remove my map location</a>
          </div>

          <div class="skool-field-container">
            <label class="skool-floating-label">Myers Briggs</label>
            <select class="skool-select">
              <option>Don't show</option>
              <option>INTJ</option>
              <option>INTP</option>
              <option>ENTJ</option>
              <option>ENTP</option>
              <option>INFJ</option>
              <option>INFP</option>
              <option>ENFJ</option>
              <option>ENFP</option>
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
          <p class="text-secondary">No communities joined yet.</p>
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
            <div class="affiliate-stat-val text-success">$0</div>
            <div class="affiliate-stat-lbl">Account balance</div>
          </div>
          <button class="affiliate-payout-btn" disabled>PAYOUT</button>
        </div>
        <div class="text-right text-muted" style="font-size: 12px; margin-bottom: 24px;">$0 available soon</div>

        <div class="settings-subhead">Your affiliate links</div>
        <div style="margin-bottom: 12px;">
          <span class="affiliate-pill">SkillSpace platform</span>
        </div>
        <p class="text-secondary" style="font-size: 13px; margin-bottom: 12px;">Earn <strong>40% commission</strong> when you invite somebody to create a SkillSpace community.</p>

        <div class="affiliate-link-row">
          <input type="text" class="skool-input" value="https://www.skillspace.com/signup?ref=4766f260f33d403ba7679753e291b7ab" readonly>
          <button class="affiliate-copy-btn" onclick="alert('Affiliate link copied!')">COPY</button>
        </div>

        <div class="empty-state-box" style="margin-top: 24px; padding: 48px 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="26" fill="#FCD34D" stroke="#1E293B" stroke-width="4"/>
            <circle cx="30" cy="30" r="21" fill="#FBBF24" stroke="#1E293B" stroke-width="2.5"/>
            <text x="30" y="38" font-family="'Inter', -apple-system, sans-serif" font-size="26" font-weight="900" fill="#1E293B" text-anchor="middle">$</text>
          </svg>
          <p class="text-secondary" style="margin: 0; font-size: 14px;">Your referrals will show here</p>
        </div>
      `;

    case 'payouts':
      return `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <h2 class="settings-panel-title">Payouts</h2>
          <button class="profile-icon-filter"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button>
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
            <div class="account-setting-val">${email}</div>
          </div>
          <button class="account-action-btn" onclick="alert('Change email modal')">CHANGE EMAIL</button>
        </div>

        <div class="account-setting-row">
          <div>
            <div class="account-setting-label">Password</div>
            <div class="account-setting-val text-muted">Change your password</div>
          </div>
          <button class="account-action-btn" onclick="alert('Change password modal')">CHANGE PASSWORD</button>
        </div>

        <div class="skool-field-container" style="margin-top: 24px;">
          <label class="skool-floating-label">Language</label>
          <select class="skool-select">
            <option>us English</option>
            <option>uk English</option>
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
          <button class="account-action-btn" onclick="confirmLogout()">LOG OUT EVERYWHERE</button>
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

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color);">
          <h2 class="settings-panel-title" style="margin-bottom: 6px;">Who can message me?</h2>
          <p class="text-secondary" style="font-size: 13px;">Only members in the group you're in can message you. You choose what group users can message you from by turning your chat on/off below.</p>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color);">
          <h2 class="settings-panel-title" style="margin-bottom: 6px;">Blocked users</h2>
          <p class="text-secondary" style="font-size: 14px;">You have no blocked users.</p>
        </div>
      `;

    case 'payment-methods':
      return `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h2 class="settings-panel-title" style="margin-bottom: 0;">Payment methods</h2>
          <button class="settings-submit-gold-btn" style="margin-top: 0;" onclick="alert('Add payment method modal')">ADD PAYMENT METHOD</button>
        </div>
        <p class="text-secondary" style="font-size: 14px;">No cards on file</p>
      `;

    case 'payment-history':
      return `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <h2 class="settings-panel-title">Payment history</h2>
          <button class="profile-icon-filter"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button>
        </div>
        <p class="text-secondary" style="font-size: 14px;">You have no payments.</p>
      `;

    case 'theme':
      return `
        <h2 class="settings-panel-title">Theme</h2>

        <div class="skool-field-container" style="margin-bottom: 24px;">
          <label class="skool-floating-label">Theme</label>
          <select class="skool-select" id="themeSelector">
            <option value="dark">Dark (default)</option>
            <option value="light">Light</option>
          </select>
        </div>

        <button class="settings-submit-gold-btn" onclick="alert('Theme preferences saved!')">SAVE</button>
      `;

    default:
      return `
        <h2 class="settings-panel-title">${activeSettingsTab.charAt(0).toUpperCase() + activeSettingsTab.slice(1)}</h2>
        <p class="text-secondary">Settings for ${activeSettingsTab} configured here.</p>
      `;
  }
}

function handleUpdateProfileSettings(e) {
  e.preventDefault();
  const fName = document.getElementById('setFirstName').value.trim();
  const lName = document.getElementById('setLastName').value.trim();
  if (currentUser) {
    currentUser.name = `${fName} ${lName}`.trim();
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    renderNavbar();
    alert('Profile updated successfully!');
  }
}
