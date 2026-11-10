/**
 * Discovery feature.
 *
 * Owns community filtering, discovery-card rendering, and the discovery page.
 * Dependencies are injected by the application entry point so this module
 * stays independent of global application state.
 */
export function createDiscoveryFeature(deps) {
  const {
    state,
    communities,
    categories,
    isVisibleCommunity,
    icon,
    escapeHTML,
    addImageIcon
  } = deps;

function parseMemberCount(value) {
  const match = String(value ?? '').trim().toLowerCase().replace(/,/g, '').match(/^([\\d.]+)\\s*([km])?$/);
  if (!match) return Number.parseFloat(value) || 0;
  const multiplier = match[2] === 'm' ? 1000000 : match[2] === 'k' ? 1000 : 1;
  return Number(match[1]) * multiplier;
}

function filteredCommunities() {
  const query = state.submittedQuery.toLowerCase();
  const result = communities.filter(isVisibleCommunity).filter((community) => (!query || `${community.title} ${community.description} ${community.category}`.toLowerCase().includes(query)) && (state.category === 'Trending' || community.category === state.category) && (state.price === 'All' || community.priceType === state.price) && (state.access === 'All' || community.accessType === state.access));
  if (state.sort === 'Top') result.sort((a, b) => parseMemberCount(b.members) - parseMemberCount(a.members));
  return result;
}

function card(community, index) {
  const image = community.cover ? `<img src="${community.cover}" alt="${escapeHTML(community.title)} cover" loading="lazy" decoding="async">` : addImageIcon('card-add-image-icon');
  return `<article class="community-card" style="--accent:${community.accent};--delay:${index * 45}ms" data-community="${community.id}"><div class="card-image">${image}<span class="card-tag">${community.tag}</span></div><div class="card-body"><div class="eyebrow">${community.category} <span>·</span> ${community.accessType === 'Private' ? icon('lock') + ' Private' : 'Open access'}</div><h2>${escapeHTML(community.title)}</h2><p>${escapeHTML(community.description)}</p><footer><span><strong>${community.members}</strong> members</span><span class="price">${community.price}</span></footer></div></article>`;
}

function discoverView() {
  const results = filteredCommunities();
  const resultHeading = state.submittedQuery ? `<div class="result-heading"><span>${results.length} results for <strong>"${escapeHTML(state.submittedQuery)}"</strong></span><button class="filter-button" data-action="filters">Filter ${icon('plus')}</button></div>` : '';
  const hasActiveFilters = state.price !== 'All' || state.access !== 'All' || state.sort !== 'Trending';

  return `<main class="discover-page"><section class="intro"><div><p class="kicker">A better place to belong</p><h1>Discover communities</h1><p class="intro-copy">or <button class="inline-create" data-action="create">create your own</button></p></div></section><section class="catalog-toolbar"><div class="searchbox">${icon('search')}<input id="search" value="${escapeHTML(state.query)}" placeholder="Search communities, topics, people..." aria-label="Search communities"></div><div class="filter-row">${categories.map((category) => `<button class="chip ${state.category === category ? 'selected' : ''}" data-category="${category}">${category}</button>`).join('')}<div class="filter-dropdown-container" id="filterDropdownContainer"><button class="chip filter-dropdown-btn" data-action="toggle-filter-menu" style="border-color:${hasActiveFilters ? 'rgb(61, 91, 169)' : 'inherit'}; font-weight:${hasActiveFilters ? '700' : 'normal'}">Filter <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:4px;"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></button><div class="filter-menu-popup ${state.filterMenu ? 'active' : ''}" id="filterPopup"><div class="filter-grid"><div class="filter-column"><div class="filter-header">Price</div><label class="filter-radio-label"><input type="radio" name="priceFilter" value="All" class="custom-radio" ${state.price === 'All' ? 'checked' : ''} data-filter-type="price"><span>All</span></label><label class="filter-radio-label"><input type="radio" name="priceFilter" value="Free" class="custom-radio" ${state.price === 'Free' ? 'checked' : ''} data-filter-type="price"><span>Free</span></label><label class="filter-radio-label"><input type="radio" name="priceFilter" value="Paid" class="custom-radio" ${state.price === 'Paid' ? 'checked' : ''} data-filter-type="price"><span>Paid</span></label></div><div class="filter-column"><div class="filter-header">Type</div><label class="filter-radio-label"><input type="radio" name="accessFilter" value="All" class="custom-radio" ${state.access === 'All' ? 'checked' : ''} data-filter-type="access"><span>All</span></label><label class="filter-radio-label"><input type="radio" name="accessFilter" value="Private" class="custom-radio" ${state.access === 'Private' ? 'checked' : ''} data-filter-type="access"><span>Private</span></label><label class="filter-radio-label"><input type="radio" name="accessFilter" value="Public" class="custom-radio" ${state.access === 'Public' ? 'checked' : ''} data-filter-type="access"><span>Public</span></label></div><div class="filter-column"><div class="filter-header">Sort</div><label class="filter-radio-label"><input type="radio" name="sortFilter" value="Trending" class="custom-radio" ${state.sort === 'Trending' ? 'checked' : ''} data-filter-type="sort"><span>Trending</span></label><label class="filter-radio-label"><input type="radio" name="sortFilter" value="Top" class="custom-radio" ${state.sort === 'Top' ? 'checked' : ''} data-filter-type="sort"><span>Top</span></label></div></div><div class="filter-footer"><span style="color:#858990; margin-right:6px;">Language</span> English<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;"><polyline points="6 9 12 15 18 9"></polyline></svg></div></div></div></div></section>${resultHeading}<section class="catalog-heading"><div><p class="kicker">Curated for you</p><h2>Communities worth your time <span>${results.length}</span></h2></div><p class="catalog-note">Updated weekly · <b>12,480</b> active members</p></section><div class="community-grid">${results.length ? results.map(card).join('') : `<div class="empty"><strong>No communities found.</strong><p>Try a broader search or reset your filters.</p><button class="outline-button" data-action="reset">Reset filters</button></div>`}</div></main>`;
}

function renderCommunityGrid() {
  const grid = document.querySelector('.community-grid');
  if (!grid) return;
  const results = filteredCommunities();
  grid.innerHTML = results.length ? results.map(card).join('') : `<div class="empty"><strong>No communities found.</strong><p>Try a broader search or reset your filters.</p><button class="outline-button" data-action="reset">Reset filters</button></div>`;
  grid.querySelectorAll('[data-action]').forEach((element) => element.addEventListener('click', () => deps.actions(element.dataset.action)));
}

  return {
    filteredCommunities,
    card,
    discoverView,
    renderCommunityGrid
  };
}
