const registerForm = document.getElementById('my-register-form');

const register = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const { email, name, password } = Object.fromEntries(formData);

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, password }),
    });

    if (!response.ok) {
      throw new Error('Registration failed. Please try again.');
    }

    // window.location.assign('../Profile/Profile.html'); // Redirect to profile page
  } catch (error) {
    console.error(error);
  }
};

registerForm.addEventListener('submit', register);
