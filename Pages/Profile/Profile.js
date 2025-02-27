document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "../Login/Login.html";
    return;
  }

  // Profile Page Tabs Logic:
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
});

document.addEventListener("DOMContentLoaded", () => {
  const savedRecipesContainer = document.querySelector(".recipes_grid");
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

  savedRecipesContainer.innerHTML = savedRecipes
    .map(
      (recipe) => `
      <div class="recipe_card">
        <a href="../Recipe/Recipe.html?recipe=${encodeURIComponent(recipe)}">
          <img src="/Assets/Food/Placeholder.png" alt="${recipe}" height="260px" />
          <div class="recipe_card_info">
            <p>${recipe}</p>
          </div>
        </a>
      </div>
    `
    )
    .join("");
});

document.addEventListener("DOMContentLoaded", () => {
  const savedRecipesContainer = document.querySelector(".recipes_grid");
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

  if (savedRecipes.length === 0) {
    savedRecipesContainer.innerHTML = "<p>No saved recipes yet.</p>";
    return;
  }

  savedRecipesContainer.innerHTML = savedRecipes
    .map(
      (recipe) => `
      <div class="recipe_card">
        <a href="../Recipe/Recipe.html?recipe=${encodeURIComponent(recipe)}">
          <img src="/Assets/Food/Placeholder.png" alt="${recipe}" height="260px" />
          <div class="recipe_card_info">
            <p>${recipe}</p>
          </div>
        </a>
        <button class="delete-recipe" data-recipe="${recipe}">Remove</button>
      </div>
    `
    )
    .join("");

  document.querySelectorAll(".delete-recipe").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const recipeToRemove = e.target.dataset.recipe;
      savedRecipes = savedRecipes.filter((r) => r !== recipeToRemove);
      localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
      e.target.parentElement.remove();
    });
  });
});
