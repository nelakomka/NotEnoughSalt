const registerForm = document.getElementById('my-register-form');

const register = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const { email, name, password } = Object.fromEntries(formData);

  try {
    const response = await fetch(
      'https://4c1be2ab503a4b95.mokky.dev/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      },
    );

    if (!response.ok) {
      throw new Error('Registration failed. Please try again.');
    }

    if (response.ok) {
      window.location.assign('../Login/Login.html');
    }

    // window.location.assign('../Profile/Profile.html'); // Redirect to profile page
  } catch (error) {
    console.error(error);
  }
};

registerForm.addEventListener('submit', register);
