document.addEventListener("DOMContentLoaded", async () => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "../Login/Login.html";
    return;
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
    // Fetch all recipes from db.json (adjust path as needed)
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
