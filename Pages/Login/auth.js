document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Ensure profile nav item exists
  const profileNavItem = document.querySelector("#profile-nav");
  if (!profileNavItem) return;

  if (isLoggedIn === "true") {
    profileNavItem.innerHTML = `<a href="../Profile/Profile.html">Profile</a> | <a href="#" id="logout-btn">Logout</a>`;
  } else {
    profileNavItem.innerHTML = `<a href="../Login/Login.html">Login</a>`;
  }

  // Logout Functionality
  const logoutButton = document.querySelector("#logout-btn");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      window.location.href = "../Login/Login.html";
    });
  }
});
