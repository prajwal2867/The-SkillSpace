/**
 * Profile feature views and contribution-history presentation.
 */
export function createProfileFeature({ state, store, communities, isVisibleCommunity, escapeHTML, initials }) {
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
  const profileCommunities = state.profileCommunityView === 'created'
    ? communities.filter((community) => String(community.id).startsWith('created-') && String(community.ownerId) === String(store.user?.id))
    : (state.joinedCommunities || []).map((id) => communities.find((community) => community.id === id)).filter(Boolean).filter(isVisibleCommunity);
  const profileCommunityLabel = state.profileCommunityView === 'created' ? 'My communities' : 'Memberships';

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
            <div class="profile-community-heading">
              <h2 class="profile-section-title">${profileCommunityLabel}</h2>
              <div class="profile-community-toggle" role="tablist" aria-label="Community view">
                <button type="button" class="profile-community-toggle-btn${state.profileCommunityView === 'memberships' ? ' active' : ''}" data-action="toggle-profile-community" data-community-view="memberships" role="tab" aria-selected="${state.profileCommunityView === 'memberships'}">Memberships</button>
                <button type="button" class="profile-community-toggle-btn${state.profileCommunityView === 'created' ? ' active' : ''}" data-action="toggle-profile-community" data-community-view="created" role="tab" aria-selected="${state.profileCommunityView === 'created'}">My communities</button>
              </div>
            </div>
            ${profileCommunities.length ? `<div class="profile-community-list">${profileCommunities.map(profileCommunityRow).join('')}</div>` : `<div class="empty-state-box"><p class="text-secondary" style="margin:0; font-size:14px;">${state.profileCommunityView === 'created' ? 'You have not created any communities yet.' : 'No memberships yet. Join a community to get started!'}</p></div>`}
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

  return {
    getContributionData,
    profileView
  };
}
