//Profile

document.addEventListener("DOMContentLoaded", async () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loginOption = document.getElementById("login-option");
  const logoutOption = document.getElementById("logout-option");

  // Checks if user is logged in
  if (!isLoggedIn || isLoggedIn !== "true") {
    document.querySelector(
      "main"
    ).innerHTML = `<p>Please <a href="../Login/Login.html">log in</a> to access your profile.</p>`;

    // Show Login, Hide Logout in dropdown
    if (loginOption && logoutOption) {
      loginOption.style.display = "block";
      logoutOption.style.display = "none";
    }
    return;
  }

  // If logged in, show Logout option and hide Login
  if (loginOption && logoutOption) {
    loginOption.style.display = "none";
    logoutOption.style.display = "block";

    logoutOption.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      window.location.href = "../Login/Login.html";
    });
  }

  // Profile Page Tabs Logic
  const tabs = document.querySelectorAll(".tab-button");
  const categories = document.querySelectorAll(".profile-category");

  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      tabs.forEach((t) => t.classList.remove("active"));
      categories.forEach((category) => category.classList.remove("active"));

      tab.classList.add("active");

      const categoryId = tab.getAttribute("data-category");
      const activeCategory = document.getElementById(categoryId);

      if (activeCategory) {
        activeCategory.classList.add("active");
      }
    });
  });

  // Load Saved Recipes
  const savedRecipesContainer = document.querySelector(".recipes_grid");
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

  if (savedRecipes.length === 0) {
    savedRecipesContainer.innerHTML = "<p>No saved recipes yet.</p>";
    return;
  }

  try {
    // Fetch all recipes from database json file
    const response = await fetch("/db.json");
    if (!response.ok) {
      throw new Error("Failed to load recipes.");
    }

    const data = await response.json();
    const allRecipes = data.recipes;

    // Generate saved recipe cards
    savedRecipesContainer.innerHTML = savedRecipes
      .map((savedRecipe) => {
        let recipeData = allRecipes.find(
          (recipe) => String(recipe.id) === String(savedRecipe.id)
        );

        if (!recipeData) return "";

        return `
          <div class="recipe_card">
            <a href="../Recipe/Recipe.html?recipeId=${encodeURIComponent(
              recipeData.id
            )}">
              <img src="${recipeData.image}" alt="${
          recipeData.name
        }" height="260px" />
              <div class="recipe_card_info">
                <p>${recipeData.name}</p>
              </div>
            </a>
            <button class="delete-recipe" data-recipe-id="${
              recipeData.id
            }">Remove</button>
          </div>
        `;
      })
      .join("");

    // Add event listeners for delete buttons
    document.querySelectorAll(".delete-recipe").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const recipeIdToRemove = e.target.dataset.recipeId;

        // Ensure both values are compared as strings
        savedRecipes = savedRecipes.filter(
          (recipe) => String(recipe.id) !== String(recipeIdToRemove)
        );

        // Update localStorage and remove recipe card
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
        e.target.parentElement.remove();

        // Show message if no saved recipes remain
        if (savedRecipes.length === 0) {
          savedRecipesContainer.innerHTML = "<p>No saved recipes yet.</p>";
        }
      });
    });
  } catch (error) {
    console.error("Error loading saved recipes:", error);
    savedRecipesContainer.innerHTML =
      "<p>Failed to load saved recipes. Please try again later.</p>";
  }
});
