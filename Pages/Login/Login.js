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

    window.location.assign("../Profile/Profile.html"); // Redirect to profile page

    //window.location.assign('../MealPlan/MealPlan.html');  // Redirect to the meal plan page
  } catch (error) {
    console.error(error);
  }
};

loginForm.addEventListener("submit", login);
