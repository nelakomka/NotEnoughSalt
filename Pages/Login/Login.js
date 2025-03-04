document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // If already logged in, redirect to Profile page
  if (isLoggedIn === "true") {
    window.location.href = "../Profile/Profile.html";
  }
});

const loginForm = document.getElementById("my-login-form");

const login = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const { email, password } = Object.fromEntries(formData);

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed. Please try again.");
    }

    const data = await response.json();

    // Store login status and user data in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    // Redirect to Profile Page
    window.location.assign("../Profile/Profile.html");
  } catch (error) {
    console.error(error);
  }
};

loginForm.addEventListener("submit", login);
