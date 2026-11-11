/** HTML-safe text and identity helpers shared by feature views. */
export const initials = (user) => (user?.name || user?.email || 'U').slice(0, 1).toUpperCase();

export const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[char]));
