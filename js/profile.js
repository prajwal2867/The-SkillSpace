// js/profile.js

function openProfilePage() {
  closeAllDropdowns();
  if (!isLoggedIn || !currentUser) {
    openLoginModal();
    return;
  }

  const mainContent = document.querySelector('.main-content');
  const profileView = document.getElementById('profilePageView');
  const settingsView = document.getElementById('settingsPageView');

  if (mainContent) mainContent.classList.add('hidden');
  if (settingsView) settingsView.classList.add('hidden');
  if (profileView) {
    profileView.classList.remove('hidden');
    renderProfilePage();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeProfilePage() {
  closeAllPages();
}

function renderProfilePage() {
  const profileView = document.getElementById('profilePageView');
  if (!profileView || !currentUser) return;

  const usernameHandle = currentUser.username
    ? `@${currentUser.username}`
    : `@${currentUser.name ? currentUser.name.toLowerCase().replace(/\s+/g, '-') : 'user'}-${Math.floor(1000 + Math.random() * 9000)}`;

  const joinDateText = currentUser.joinDate
    ? new Date(currentUser.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Aug 15, 2026';

  const userInitial = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : (currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'U');

  profileView.innerHTML = `
    <div class="profile-layout">
      <!-- Left Column: Activity & Memberships -->
      <div class="profile-main-column">
        <!-- Activity Heatmap Section -->
        <div class="profile-section-card">
          <h2 class="profile-section-title">Activity</h2>
          <div class="heatmap-container">
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
              <div class="heatmap-squares-grid">
                ${Array.from({ length: 364 }).map((_, i) => `<div class="heatmap-square ${i > 350 ? 'active-level-1' : ''}"></div>`).join('')}
              </div>
            </div>
            <div class="heatmap-footer">
              <span class="text-secondary" style="font-size: 13px;">What is this?</span>
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
          </div>
        </div>

        <!-- Memberships Section -->
        <div class="profile-section-card">
          <h2 class="profile-section-title">Memberships</h2>
          <div class="empty-state-box">
            <p class="text-secondary">No memberships yet. Join a community to get started!</p>
          </div>
        </div>

        <!-- Contributions Section -->
        <div class="profile-section-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2 class="profile-section-title" style="margin-bottom: 0;">Contributions</h2>
            <div style="display: flex; gap: 8px; align-items: center;">
              <select class="profile-select-dropdown">
                <option>Select a group to see contributions</option>
              </select>
              <button class="profile-icon-filter">
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
            ${currentUser.pfp
      ? `<img src="${currentUser.pfp}" alt="Avatar" class="bio-avatar-img">`
      : `<div class="user-avatar-initial large">${userInitial}</div>`
    }
          </div>
          
          <h2 class="bio-user-name">${currentUser.name || 'Prajwal Ramagiri'}</h2>
          <div class="bio-user-handle">${usernameHandle}</div>
          <div class="bio-user-text">- nil -</div>

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
              <div class="stat-num">0</div>
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

          <button class="edit-profile-btn" onclick="openSettingsPage()">EDIT PROFILE</button>
        </div>

        <div class="powered-by-tag">
          Powered by <strong>SkillSpace</strong>
        </div>
      </div>
    </div>
  `;
}
