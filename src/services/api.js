async function request(path, options = {}) {
  const response = await fetch(`/api/v1${path}`, {
    credentials: 'same-origin',
    ...options,
    headers: {
      ...(options.body ? { 'content-type': 'application/json' } : {}),
      ...options.headers
    }
  });
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    throw new Error('The API returned an unexpected response. Check that the SkillSpace API is running.');
  }
  const payload = await response.json();
  if (!response.ok) {
    const error = new Error(payload.error?.message || 'The request could not be completed.');
    error.status = response.status;
    error.code = payload.error?.code || 'request_failed';
    throw error;
  }
  return payload;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' })
};
