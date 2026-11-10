/**
 * Community-facing page views.
 * These functions render existing UI and receive their dependencies explicitly.
 */
export function createCommunityViews({ state, store, communities, demoPosts = [], escapeHTML, addImageIcon, initials }) {
function creatorCommunityView() {
  const community = communities.find((item) => item.id === state.selected) || communities[0];
  const isCreatedCommunity = String(community.id).startsWith('created-');
  const isOwner = isCreatedCommunity && String(community.ownerId) === String(store.user?.id);
  const hasDescription = Boolean(community.description && community.description !== 'A private community for creators.');
  const hasCover = Boolean(community.cover);
  const completedSetupItems = [hasDescription, hasCover].filter(Boolean).length;
  const user = store.user || { name: 'Creator' };
  const userAvatar = user.pfp || community.creatorAvatar;
  const communityPosts = [...store.posts.filter((post) => String(post.communityId) === String(community.id)), ...demoPosts.filter((post) => String(post.communityId) === String(community.id))];
  return `
    <main class="creator-community-page">
      <div class="creator-community-layout">
        <section class="creator-community-main">
          <form id="postForm" class="creator-composer">
            ${userAvatar ? '<img src="' + escapeHTML(userAvatar) + '" alt="' + escapeHTML(user.name) + '" class="creator-avatar">' : '<span class="creator-avatar creator-avatar-fallback">' + initials(user) + '</span>'}
            <input type="text" name="text" maxlength="1000" placeholder="Share something with the community..." required>
            <button type="submit">Post</button>
          </form>
          ${communityPosts.length ? '<div class="community-feed">' + communityPosts.map((post) => '<article class="community-feed-post"><div class="community-feed-post-header"><strong>' + escapeHTML(post.name || 'Community member') + '</strong><span>' + escapeHTML(post.role || 'Member') + ' · ' + escapeHTML(post.time || 'Recently') + '</span></div><p>' + escapeHTML(post.text || '') + '</p><div class="community-feed-post-actions"><span>♡ ' + Number(post.likes || 0) + ' likes</span><span>▢ ' + Number(post.comments || 0) + ' comments</span>' + (post.demo ? '<span class="demo-activity-label">Sample activity</span>' : '') + '</div></article>').join('') + '</div>' : '<div class="community-feed-empty"><strong>Your community starts here.</strong><p>No posts yet. Share the first update, welcome members or start a discussion.</p></div>'}
          <div class="creator-feed-toolbar">
            <button class="creator-filter active">All</button>
            <button class="creator-filter">General discussion</button>
            <button class="creator-settings-button" aria-label="Filter posts">☷</button>
          </div>
          ${isOwner ? `<section class="setup-card">
            <div class="setup-card-heading"><span class="setup-progress ${completedSetupItems ? 'has-progress' : ''}" style="--setup-progress:${completedSetupItems * 25}%" aria-hidden="true"></span><strong>Set up your group</strong><span class="setup-chevron">⌃</span></div>
            <div class="setup-item"><span class="setup-circle"></span><a href="#invite-people">Invite 3 people</a></div>
            <div class="setup-item ${hasDescription ? 'is-complete' : ''}"><span class="setup-circle">${hasDescription ? '✓' : ''}</span><a href="#group-description" data-action="community-settings">Add group description</a></div>
            <div class="setup-item ${hasCover ? 'is-complete' : ''}"><span class="setup-circle">${hasCover ? '✓' : ''}</span><a href="#cover-image" data-action="community-settings">Set cover image</a></div>
            <div class="setup-item"><span class="setup-circle"></span><a href="#first-post">Write your first post</a></div>
          </section>` : ''}
        </section>
        <aside class="creator-community-sidebar">
          <div class="creator-group-card">
            <div class="creator-cover-placeholder">${community.cover ? `<img src="${escapeHTML(community.cover)}" alt="${escapeHTML(community.title)} cover">` : addImageIcon('creator-add-image-icon')}</div>
            <div class="creator-group-content">
              <h1>${escapeHTML(community.title)}</h1>
              <p class="creator-group-url">skillspace.in/${escapeHTML(community.slug || 'community')}</p>
              <p class="creator-private-label">♙ ${escapeHTML(community.accessType || 'Private')} group</p>
              <p class="creator-group-description">${escapeHTML(community.description || 'Add your group description here by clicking the “Settings” button.')}</p>
              <div class="creator-stat-row"><div><strong>${escapeHTML(community.members || '1')}</strong><span>Members</span></div><div><strong>${escapeHTML(community.onlineCount || '0')}</strong><span>Online</span></div><div><strong>${escapeHTML(community.adminsCount || '1')}</strong><span>Admins</span></div></div>
              ${!isCreatedCommunity ? `<div class="creator-avatar-stack">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="">
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="">
                <img src="https://randomuser.me/api/portraits/women/24.jpg" alt="">
                <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="">
                <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="">
              </div>` : ''}
              ${isOwner ? '<button class="creator-settings-cta" type="button" data-action="community-settings">SETTINGS</button>' : '<span class="creator-member-label">Community member</span>'}
            </div>
          </div>
          <p class="creator-powered-by">powered by <strong>skillspace</strong></p>
        </aside>
      </div>
    </main>
  `;
}



function profileCommunityRow(community) {
  const iconSource = community.creatorAvatar || community.cover;
  const iconMarkup = iconSource
    ? `<img src="${escapeHTML(iconSource)}" alt="${escapeHTML(community.title)} icon">`
    : addImageIcon('profile-community-placeholder-icon');
  const isFree = community.priceType === 'Free' || community.price === 'Free' || community.price === 'Free trial';
  return `<div class="profile-community-row"><button type="button" class="profile-community-icon" data-action="select-community" data-id="${escapeHTML(community.id)}" aria-label="Open ${escapeHTML(community.title)}">${iconMarkup}</button><span class="profile-community-info"><button type="button" class="profile-community-title" data-action="select-community" data-id="${escapeHTML(community.id)}">${escapeHTML(community.title)}</button><span>${escapeHTML(community.members || '0')} members · ${isFree ? 'Free' : 'Paid'}</span></span></div>`;
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
                    <img src="${cardItem.image}" alt="${escapeHTML(cardItem.title)}" class="carousel-card-img" loading="lazy" decoding="async">
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

function detailView() {
  const community = communities.find((item) => item.id === state.selected) || communities[0];
  const isJoined = (state.joinedCommunities || []).includes(community.id);
  const isCreatedCommunity = String(community.id).startsWith('created-');
  const galleryImages = isCreatedCommunity
    ? []
    : [
        community.cover,
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80'
      ].filter(Boolean);
  const currentMediaImage = galleryImages[state.selectedMediaIndex] || galleryImages[0];
  const hasRating = Number.isFinite(Number(community.rating)) && Number(community.reviewCount || 0) > 0;
  const hasReviews = Array.isArray(community.reviews) && community.reviews.length > 0;
  const hasMedia = Boolean(currentMediaImage);

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
            ${hasRating ? `<div class="about-star-rating-row"><span class="star-gold">★ ★ ★ ★ ★</span><span class="rating-val">${community.rating}</span><span class="review-count-text">· ${community.reviewCount} reviews</span></div>` : ''}
          </div>

          <!-- Video / Media Screen Container -->
          ${hasMedia ? `<div class="media-screen-box"><img src="${escapeHTML(currentMediaImage)}" class="media-screen-img" alt="${escapeHTML(community.title)} presentation"><div class="media-play-overlay"><svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div><span class="media-timestamp-badge">4:52</span></div>` : `<div class="media-empty-state">${addImageIcon('media-empty-state-icon')}<span>No community media yet</span></div>`}

          <!-- Media Thumbnails Selector Row -->
          ${galleryImages.length ? `<div class="media-thumbs-row">
            ${galleryImages.map((img, idx) => `
              <button class="media-thumb-item ${state.selectedMediaIndex === idx ? 'active' : ''}" data-action="select-media-thumb" data-index="${idx}">
                ${idx === 0 ? `<div class="thumb-play-icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>` : ''}
                <img src="${img}" alt="Thumbnail ${idx + 1}" loading="lazy" decoding="async">
              </button>
            `).join('')}
          </div>` : ''}

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
            ${hasRating ? `<div class="reviews-title-row"><span class="star-gold-lg">★</span><h2>${community.rating} · ${community.reviewCount} reviews</h2></div>` : `<div class="reviews-empty-state">No reviews yet</div>`}

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

            ${hasReviews ? '<button class="see-more-link" data-action="see-more-reviews">See more</button>' : ''}
          </div>

          <div class="about-footer-legal">
            <a href="#" onclick="return false;">Privacy and terms</a>
          </div>
        </div>

        <!-- Sticky Right Sidebar Card -->
        <aside class="skool-about-sidebar">
          <div class="sticky-sidebar-card">
            <div class="sidebar-cover-header">
              ${community.cover ? `<img src="${escapeHTML(community.cover)}" alt="${escapeHTML(community.title)} cover">` : addImageIcon('sidebar-empty-cover-icon')}
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
              ${!isCreatedCommunity ? `<div class="sidebar-avatar-stack">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/men/45.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/women/24.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/men/22.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/women/12.jpg" class="stack-avatar" alt="">
              </div>` : ''}

              <!-- Prominent Join Group Button -->
              <button class="skool-join-button ${isJoined ? 'joined' : ''}" data-action="${isJoined ? 'open-community' : 'join'}">
                ${isJoined ? 'OPEN COMMUNITY' : 'JOIN GROUP'}
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

  return {
    creatorCommunityView,
    createCommunityView,
    detailView
  };
}
