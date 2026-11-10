/**
 * Plans and checkout presentation.
 * Payment processing is intentionally not implemented in this frontend module.
 */
export function createBillingFeature({ state, escapeHTML }) {
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

function planModalContent() {
  const planName = state.selectedPlan || 'Hobby';
  const isYearly = state.planBilling === 'yearly';
  const price = planName === 'Pro' ? (isYearly ? '$82' : '$99') : (isYearly ? '$7.50' : '$9');
  const chargeDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return `
    <section class="plan-modal-card" role="dialog" aria-modal="true" aria-labelledby="plan-modal-title" onclick="event.stopPropagation()">
      <button class="modal-close" data-action="close-modal" aria-label="Close">&times;</button>
      <div class="plan-modal-logo" aria-label="SkillSpace"><span>skill</span>space</div>
      <h2 id="plan-modal-title">Create your community</h2>
      <p class="plan-modal-subtitle">14-day free trial of ${escapeHTML(planName)} ${price}/month <button type="button" class="plan-change-link" data-action="change-plan">(change)</button></p>
      <form id="planCheckoutForm" class="plan-checkout-form">
        <div class="plan-field-group">
          <label for="communityName">Group name</label>
          <input id="communityName" name="communityName" maxlength="30" placeholder="Group name" required autofocus>
          <div class="plan-field-hint"><em>You can change this later</em><span id="communityNameCount">0 / 30</span></div>
        </div>
        <div class="plan-card-input" aria-label="Payment card details">
          <span class="plan-card-icon">▣</span>
          <input name="cardNumber" data-card-step="cardNumber" inputmode="numeric" maxlength="16" placeholder="Card number" aria-label="Card number" required>
          <input name="expiryMonth" data-card-step="expiryMonth" inputmode="numeric" maxlength="2" placeholder="MM" aria-label="Expiration month" required>
          <span class="plan-card-expiry-separator" aria-hidden="true">/</span>
          <input name="expiryYear" data-card-step="expiryYear" inputmode="numeric" maxlength="2" placeholder="YY" aria-label="Expiration year" required>
          <input name="cvc" data-card-step="cvc" inputmode="numeric" maxlength="3" placeholder="CVC" aria-label="CVC" required>
        </div>
        <button type="submit" class="plan-trial-button" disabled>START FREE TRIAL</button>
      </form>
      <p class="plan-modal-note">Your 1st charge will be on ${chargeDate} for ${price}. We'll email you 3-days before to remind you. Cancel anytime with 1-click.</p>
    </section>
  `;
}

  return {
    selectPlanView,
    planModalContent
  };
}
