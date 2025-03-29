async function checkUser() {
  const user = localStorage.getItem('user');

  const userData = JSON.parse(user || '{}');

  if (!userData.token) {
    window.location.replace('/Pages/Login/Login.html');
  }

  const response = await fetch('https://4c1be2ab503a4b95.mokky.dev/auth_me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });

  if (response.status !== 200) {
    window.location.replace('/Pages/Login/Login.html');
  }
}

function logout() {
  localStorage.removeItem('user');

  window.location.replace('/');
}

document.addEventListener('DOMContentLoaded', () => {
  checkUser();
});
