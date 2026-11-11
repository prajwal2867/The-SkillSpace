/**
 * Small view router for the current client-side application.
 * Views remain feature-owned; this module only maps state keys to renderers.
 */
export function createViewRouter(routes, fallback = 'settings') {
  if (!routes || typeof routes !== 'object') {
    throw new TypeError('Router routes must be an object.');
  }

  return {
    resolve(view) {
      const renderer = routes[view] || routes[fallback];
      if (typeof renderer !== 'function') {
        throw new Error(`No view renderer registered for "${view}" or fallback "${fallback}".`);
      }
      return renderer;
    }
  };
}
