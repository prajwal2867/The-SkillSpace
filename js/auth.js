// js/auth.js

function openLoginModal() {
  showStandardLoginView();
  const modal = document.getElementById('loginModal');
  const errorMsg = document.getElementById('modalLoginError');
  const form = document.getElementById('modalLoginForm');
  if (errorMsg && !errorMsg.classList.contains('success-msg')) errorMsg.classList.add('hidden-msg');
  if (form) form.reset();
  if (modal) modal.classList.add('active');
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.remove('active');
}

function openRegisterModal() {
  const modal = document.getElementById('registerModal');
  const errorMsg = document.getElementById('modalRegisterError');
  const form = document.getElementById('modalRegisterForm');
  if (errorMsg) errorMsg.classList.add('hidden-msg');
  if (form) form.reset();
  if (modal) modal.classList.add('active');
}

function closeRegisterModal() {
  const modal = document.getElementById('registerModal');
  if (modal) modal.classList.remove('active');
}

function switchToRegisterModal() {
  closeLoginModal();
  openRegisterModal();
}

function switchToLoginModal() {
  closeRegisterModal();
  openLoginModal();
}

function showStandardLoginView() {
  document.getElementById('loginModalTitle').textContent = "Log in to Skill Space";
  document.getElementById('modalLoginForm').classList.remove('hidden');
  document.getElementById('forgotPasswordView').classList.add('hidden');
  document.getElementById('loginWithCodeView').classList.add('hidden');
}

function showForgotPasswordView() {
  document.getElementById('loginModalTitle').textContent = "Forgot Password";
  document.getElementById('modalLoginForm').classList.add('hidden');
  document.getElementById('forgotPasswordView').classList.remove('hidden');
  document.getElementById('loginWithCodeView').classList.add('hidden');
  document.getElementById('forgotSuccessMsg').classList.add('hidden-msg');
}

function showLoginWithCodeView() {
  const emailInput = document.getElementById('modalEmail').value.trim() || 'your email';
  document.getElementById('codeViewEmailDisplay').textContent = emailInput;
  document.getElementById('loginModalTitle').textContent = "We sent you a code";
  document.getElementById('modalLoginForm').classList.add('hidden');
  document.getElementById('forgotPasswordView').classList.add('hidden');
  document.getElementById('loginWithCodeView').classList.remove('hidden');
}

function handleForgotPasswordSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('forgotSuccessMsg');
  success.classList.remove('hidden-msg');
}

function handleCodeLoginSubmit(e) {
  e.preventDefault();
  alert('Code login demo verified!');
  showStandardLoginView();
  closeLoginModal();
}

function openLogoutConfirmModal() {
  closeAllDropdowns();
  const modal = document.getElementById('logoutConfirmModal');
  if (modal) modal.classList.add('active');
}

function closeLogoutConfirmModal() {
  const modal = document.getElementById('logoutConfirmModal');
  if (modal) modal.classList.remove('active');
}

function confirmLogout() {
  const token = localStorage.getItem('sessionToken');
  if (token) {
    deleteSession(token);
    localStorage.removeItem('sessionToken');
  }
  isLoggedIn = false;
  currentUser = null;
  localStorage.removeItem('currentUser');
  closeLogoutConfirmModal();
  closeAllPages();
  renderNavbar();
}

function getRegisteredUsers() {
  const stored = localStorage.getItem('registeredUsers');
  return stored ? JSON.parse(stored) : [];
}

function saveRegisteredUser(user) {
  const users = getRegisteredUsers();
  users.push(user);
  localStorage.setItem('registeredUsers', JSON.stringify(users));
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getFailedAttempts(email) {
  const key = `login_attempts_${email.toLowerCase()}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

function recordFailedAttempt(email) {
  const key = `login_attempts_${email.toLowerCase()}`;
  localStorage.removeItem(key);
}

function isRateLimited(email) {
  return false;
}

function clearFailedAttempts(email) {
  const key = `login_attempts_${email.toLowerCase()}`;
  localStorage.removeItem(key);
}

function generateSessionToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

function saveSession(token, user) {
  const sessions = JSON.parse(localStorage.getItem('sessions') || '{}');
  sessions[token] = {
    userId: user.id,
    email: user.email,
    createdAt: Date.now()
  };
  localStorage.setItem('sessions', JSON.stringify(sessions));
}

function getSession(token) {
  const sessions = JSON.parse(localStorage.getItem('sessions') || '{}');
  return sessions[token] || null;
}

function deleteSession(token) {
  const sessions = JSON.parse(localStorage.getItem('sessions') || '{}');
  delete sessions[token];
  localStorage.setItem('sessions', JSON.stringify(sessions));
}

function validateSession() {
  const token = localStorage.getItem('sessionToken');
  if (!token) return null;
  const session = getSession(token);
  if (!session) return null;
  if (Date.now() - session.createdAt > 7 * 24 * 60 * 60 * 1000) {
    deleteSession(token);
    localStorage.removeItem('sessionToken');
    return null;
  }
  return session;
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  const emailInput = document.getElementById('modalEmail').value.trim().toLowerCase();
  const passwordInput = document.getElementById('modalPassword').value;
  const errorMsg = document.getElementById('modalLoginError');

  if (!emailInput || !passwordInput) {
    errorMsg.textContent = "Email and password are required.";
    errorMsg.className = "login-status-msg error-msg";
    errorMsg.classList.remove('hidden-msg');
    return;
  }

  const passwordHash = await hashPassword(passwordInput);

  let foundUser = null;

  const registeredUsers = getRegisteredUsers();
  foundUser = registeredUsers.find(u => u.email.toLowerCase() === emailInput && u.passwordHash === passwordHash);

  if (!foundUser && typeof dummyUsers !== 'undefined' && Array.isArray(dummyUsers)) {
    foundUser = dummyUsers.find(u => u.email.toLowerCase() === emailInput && u.passwordHash === passwordHash);
  }

  if (foundUser) {
    clearFailedAttempts(emailInput);
    const token = generateSessionToken();
    saveSession(token, foundUser);
    localStorage.setItem('sessionToken', token);
    isLoggedIn = true;
    currentUser = foundUser;
    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    errorMsg.classList.add('hidden-msg');
    closeLoginModal();
    renderNavbar();
  } else {
    recordFailedAttempt(emailInput);
    errorMsg.textContent = "Invalid email or password.";
    errorMsg.className = "login-status-msg error-msg";
    errorMsg.classList.remove('hidden-msg');
  }
}

async function handleRegisterSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('regFullName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  const errorMsg = document.getElementById('modalRegisterError');

  if (!name || !email || !password) {
    errorMsg.textContent = "All fields are required.";
    errorMsg.className = "login-status-msg error-msg";
    errorMsg.classList.remove('hidden-msg');
    return;
  }

  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match.";
    errorMsg.className = "login-status-msg error-msg";
    errorMsg.classList.remove('hidden-msg');
    return;
  }

  if (password.length < 8) {
    errorMsg.textContent = "Password must be at least 8 characters.";
    errorMsg.className = "login-status-msg error-msg";
    errorMsg.classList.remove('hidden-msg');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorMsg.textContent = "Please enter a valid email address.";
    errorMsg.className = "login-status-msg error-msg";
    errorMsg.classList.remove('hidden-msg');
    return;
  }

  const registeredUsers = getRegisteredUsers();
  const existingInLocal = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  const existingInDummy = (typeof dummyUsers !== 'undefined' && Array.isArray(dummyUsers))
    ? dummyUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    : false;

  if (existingInLocal || existingInDummy) {
    errorMsg.textContent = "User already exists. Please try to login";
    errorMsg.className = "login-status-msg error-msg";
    errorMsg.classList.remove('hidden-msg');
    return;
  }

  const passwordHash = await hashPassword(password);

  const newUser = {
    id: Date.now(),
    name: name,
    username: name.toLowerCase().replace(/\s+/g, '_') + Math.floor(Math.random() * 100),
    email: email,
    passwordHash: passwordHash,
    pfp: null,
    status: 'online',
    joinDate: new Date().toISOString().split('T')[0],
    bio: 'New member',
    points: 0,
    level: 1
  };

  saveRegisteredUser(newUser);
  if (typeof dummyUsers !== 'undefined' && Array.isArray(dummyUsers)) {
    dummyUsers.push(newUser);
  }

  closeRegisterModal();
  openLoginModal();
  const loginStatusMsg = document.getElementById('modalLoginError');
  loginStatusMsg.textContent = "Account created successfully! You may now login";
  loginStatusMsg.className = "login-status-msg success-msg";
  loginStatusMsg.classList.remove('hidden-msg');
}
