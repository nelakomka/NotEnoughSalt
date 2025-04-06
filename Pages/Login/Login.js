const loginForm = document.getElementById('my-login-form');

const login = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const { email, password } = Object.fromEntries(formData);

  try {
    const response = await fetch('https://4c1be2ab503a4b95.mokky.dev/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert('Login failed. Please try again.');
    }

    localStorage.setItem('user', JSON.stringify(data));

    window.location.replace('/Pages/Profile/Profile.html');
  } catch (error) {
    console.error(error);
  }
};

loginForm.addEventListener('submit', login);
