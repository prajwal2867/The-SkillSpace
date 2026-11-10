/** Pure input validation shared by the auth and checkout flows. */
export function validateAuthInput(data, mode = 'login') {
  const email = String(data.email || '').trim().toLowerCase();
  const password = String(data.password || '');
  if (!email || !password || (mode === 'register' && (!String(data.firstName || '').trim() || !String(data.lastName || '').trim() || !data.confirmPassword))) {
    return 'All fields are required.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (mode === 'register' && password !== data.confirmPassword) return 'Passwords do not match.';
  return null;
}

export function isCheckoutReady({ communityName, cardNumber, expiryMonth, expiryYear, cvc }) {
  const month = Number(expiryMonth);
  return String(communityName || '').trim().length > 0
    && /^\d{1,16}$/.test(String(cardNumber || ''))
    && /^\d{1,2}$/.test(String(expiryMonth || ''))
    && /^\d{2}$/.test(String(expiryYear || ''))
    && /^\d{3}$/.test(String(cvc || ''))
    && month >= 1 && month <= 12;
}
