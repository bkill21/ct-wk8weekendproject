import Shop from './shop';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    loginForm?.addEventListener('submit', Shop.loginUser);
  });