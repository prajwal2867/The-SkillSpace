/** Event handlers for authentication and community/plan modals. */
import { validateAuthInput } from '../../domain/validation.js';
export function createAuthEvents(deps) {
  const { state, communities, isVisibleCommunity, store, modalCardContent, closeAuthModal, render, showToast, setAuthMessage, hashPassword, findAuthUser, syncOwnedCommunities, refreshHeader } = deps;

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
        state.joinedCommunities = store.getMemberships();
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
      const updateTrialButton = () => {
        trialButton.disabled = !String(communityName?.value || '').trim();
      };

      communityName?.addEventListener('input', (event) => {
        const counter = document.querySelector('#communityNameCount');
        if (counter) counter.textContent = `${event.target.value.length} / 30`;
        updateTrialButton();
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
          price: 'Set by host',
          priceType: 'Host set',
          creatorSubscription: { plan: state.selectedPlan || 'Hobby', trialDays: 14, status: 'trialing' },
          accessType: 'Private',
          category: 'Trending',
          cover: '',
          creatorName: user.name || 'Creator',
          creatorAvatar: user.pfp || ''
        };
        communities.push(community);
        store.saveCommunity(community);
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

  return { bindAuth, bindCommunityCropper };
}
