import { DEFAULT_VIEW } from '../shared/constants/app.js';

/**
 * Shared application state.
 * Keep feature-specific state grouped here until it can be owned by its feature.
 */
export const state = { view: DEFAULT_VIEW, category: 'Trending', price: 'All', access: 'All', sort: 'Trending', query: '', submittedQuery: '', selected: null, settingsTab: 'profile', modal: null, authMode: 'login', profileMenu: false, chatMenu: false, filterMenu: false, authMessage: '', themeMode: 'light', selectedContributionGroup: 'All communities', selectedMediaIndex: 0, communityTab: 'About', joinedCommunities: [], profileCommunityView: 'memberships', planBilling: 'monthly', selectedPlan: null, pendingCommunityMedia: null, cropper: null };
