/**
 * Modal presentation for authentication, community settings, and plan selection.
 */
export function createModalViews({ state, communities, escapeHTML, addImageIcon, initials, planModalContent }) {
function communitySettingsModalContent() {
  const community = communities.find((item) => item.id === state.selected) || communities[0];
  const title = escapeHTML(community.title);
  const description = escapeHTML(community.description || '');
  const initialsText = escapeHTML((community.title || 'C').slice(0, 2).toUpperCase());
  const iconSource = state.pendingCommunityMedia?.type === 'icon' ? state.pendingCommunityMedia.dataUrl : community.creatorAvatar;
  const coverSource = state.pendingCommunityMedia?.type === 'cover' ? state.pendingCommunityMedia.dataUrl : community.cover;
  const navItems = ['Dashboard', 'Layouts', 'Invite', 'General', 'Subscriptions', 'Categories', 'Tabs', 'Plugins', 'Metrics', 'Gamification', 'Discovery', 'Links', 'Billing & referrals'];

  return `
    <section class="community-settings-card" role="dialog" aria-modal="true" aria-labelledby="community-settings-title" onclick="event.stopPropagation()">
      <header class="community-settings-header">
        <div class="community-settings-brand"><span class="community-settings-avatar">${initialsText}</span><div><strong id="community-settings-title">${title}</strong><span>Group settings</span></div></div>
        <button class="community-settings-close" data-action="close-modal" aria-label="Close">&times;</button>
      </header>
      <div class="community-settings-layout">
        <nav class="community-settings-nav" aria-label="Group settings sections">
          ${navItems.map((item) => `<button type="button" class="community-settings-nav-item${item === 'General' ? ' active' : ''}"${item === 'General' ? '' : ' disabled'}>${item}</button>`).join('')}
        </nav>
        <form class="community-settings-content" id="communitySettingsForm">
          <div class="community-settings-media-row">
            <div class="community-settings-media-item"><div class="community-settings-media-label"><strong>Icon</strong><span>Recommended:<br>128x128</span></div><label class="community-settings-upload community-settings-icon-upload">${iconSource ? `<img src="${escapeHTML(iconSource)}" alt="">` : addImageIcon('community-settings-add-image-icon')}<input type="file" accept="image/*" aria-label="Upload group icon"></label><button type="button" class="community-settings-change" data-action="community-upload-icon">CHANGE</button></div>
            <div class="community-settings-media-item"><div class="community-settings-media-label"><strong>Cover</strong><span>Recommended:<br>1084x576</span></div><label class="community-settings-upload community-settings-cover-upload">${coverSource ? `<img src="${escapeHTML(coverSource)}" alt="">` : addImageIcon('community-settings-add-image-icon')}<input type="file" accept="image/*" aria-label="Upload cover image"></label><button type="button" class="community-settings-change" data-action="community-upload-cover">CHANGE</button></div>
          </div>
          <div class="community-settings-fields">
            <div class="community-settings-field"><label for="communitySettingsName">Group name</label><input id="communitySettingsName" name="title" class="skool-input" value="${title}" maxlength="30" required><span class="community-settings-counter">${community.title.length}/30</span></div>
            <div class="community-settings-field is-disabled"><label for="communitySettingsUrl">URL</label><input id="communitySettingsUrl" class="skool-input" value="skool.com/${escapeHTML(community.slug || '')}" disabled><p>You can change your URL with a paid account. <a href="#upgrade">Upgrade now?</a></p></div>
            <div class="community-settings-field"><label for="communitySettingsDescription">Group description</label><textarea id="communitySettingsDescription" name="description" class="skool-textarea" maxlength="150" placeholder="Tell members what this group is about">${description}</textarea><span class="community-settings-counter">${(community.description || '').length}/150</span></div>
            <div class="community-settings-inline-fields"><div class="community-settings-field"><label for="communitySettingsInitials">Initials</label><input id="communitySettingsInitials" name="initials" class="skool-input" value="${initialsText}" maxlength="2"></div><div class="community-settings-field"><label for="communitySettingsColor">Color</label><div class="community-settings-color-control"><input id="communitySettingsColorPicker" type="color" value="${escapeHTML(community.accent || '#3d5ba9')}" aria-label="Choose community color"><input id="communitySettingsColor" name="color" class="skool-input community-settings-color-input" value="${escapeHTML(community.accent || '#3d5ba9')}" pattern="^#[0-9a-fA-F]{6}$" maxlength="7"></div></div></div>
            <fieldset class="community-settings-privacy"><legend>Who can see this group?</legend><label><input type="radio" name="accessType" value="Private"${community.accessType !== 'Public' ? ' checked' : ''}><span><strong>Private</strong><small>Only members can see who is in the group and what they post.</small></span></label><label><input type="radio" name="accessType" value="Public"${community.accessType === 'Public' ? ' checked' : ''}><span><strong>Public</strong><small>Anyone can see who is in the group and what they post.</small></span></label></fieldset>
            <button type="submit" class="settings-submit-gold-btn">SAVE CHANGES</button>
          </div>
        </form>
      </div>
    </section>
  `;
}

function modalCardContent() {
  if (state.modal === 'plan') {
    return planModalContent();
  }
  if (state.modal === 'community-cropper') {
    return communityCropperModalContent();
  }
  if (state.modal === 'community-settings') {
    return communitySettingsModalContent();
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

function communityCropperModalContent() {
  const type = state.cropper?.type || 'cover';
  const isIcon = type === 'icon';
  const title = isIcon ? 'Crop group icon' : 'Crop new cover photo';
  const ratio = isIcon ? '1 / 1' : '1084 / 576';
  return `
    <section class="community-cropper-card" role="dialog" aria-modal="true" aria-labelledby="community-cropper-title" onclick="event.stopPropagation()">
      <header class="community-cropper-header"><h2 id="community-cropper-title">${title}</h2><button class="community-settings-close" data-action="close-modal" aria-label="Close">&times;</button></header>
      <div class="community-cropper-body">
        <div class="community-cropper-viewport ${isIcon ? 'is-icon' : ''}" data-ratio="${ratio}"><img id="communityCropImage" src="${escapeHTML(state.cropper?.src || '')}" alt="Selected ${isIcon ? 'icon' : 'cover'} preview"></div>
        <div class="community-cropper-controls"><label for="communityCropZoom">Zoom</label><input id="communityCropZoom" type="range" min="1" max="3" step="0.01" value="1" aria-label="Zoom image"><span id="communityCropZoomValue">100%</span></div>
      </div>
      <footer class="community-cropper-footer"><button type="button" class="community-cropper-cancel" data-action="close-modal">CANCEL</button><button type="button" class="settings-submit-gold-btn community-cropper-save" data-action="save-community-crop">SAVE</button></footer>
    </section>
  `;
}

function modal() {
  if (!state.modal) return '';
  const modalClass = state.modal === 'community-settings' ? ' modal-backdrop-community-settings' : '';
  return `<div class="modal-backdrop${modalClass}">${modalCardContent()}</div>`;
}

  return {
    communitySettingsModalContent,
    modalCardContent,
    communityCropperModalContent,
    modal
  };
}
