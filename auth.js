async function checkUser() {
  const user = localStorage.getItem('user');

  const userData = JSON.parse(user || '{}');

  if (!userData.accessToken) {
    window.location.replace('/Pages/Login/Login.html');
  }

  const response = await fetch('http://localhost:3000/user/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userData.accessToken}`,
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
