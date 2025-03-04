const getRecipeName = document.querySelector(".recipe_title");
const getRecipeCountry = document.querySelector(".country");
const getRecipeMealType = document.querySelector(".meal_time");
const getRecipeTime = document.querySelector(".recipe_time");
const getRecipePeople = document.querySelector(".recipe_people");
const getRecipeIngredients = document.querySelector(".recipe_ingredients");
const getRecipeImage = document.querySelector(".recipe_image_img");
const getRecipeInstructions = document.querySelector(".recipe_instructions");
const heartIcon = document.querySelector(".heart-icon");

// Retrieve recipe ID from URL
const recipeId = new URLSearchParams(window.location.search).get("recipeId");

const displayRecipe = async (recipeId) => {
  if (!recipeId) {
    console.error("Recipe ID not provided.");
    return;
  }

  try {
    // Fetch the recipe data dynamically
    const response = await fetch("/db.json");
    const data = await response.json();

    // Ensure recipe ID comparison matches expected type (string vs. number issue)
    const recipe = data.recipes.find(
      (r) => r.id.toString() === recipeId.toString()
    );

    if (!recipe) {
      console.error("Recipe not found.");
      return;
    }

    // Populate Recipe Details
    getRecipeName.textContent = recipe.name;
    getRecipeCountry.textContent = recipe.tags.cuisine;
    getRecipeMealType.textContent = recipe.tags.mealTypes.join(", ");
    getRecipeTime.textContent = recipe.tags.cookingTime;
    getRecipePeople.textContent = `${recipe.tags.servings} servings`;
    getRecipeImage.setAttribute("src", recipe.image);

    getRecipeIngredients.innerHTML = `
      <h1>Ingredients</h1>
      <ul>
        ${recipe.ingredients
          ?.map(
            (ingredient) =>
              `<li><input type="checkbox"> ${ingredient.name}</li>`
          )
          .join("")}
      </ul>
    `;

    getRecipeInstructions.innerHTML = `
      <h4>Instructions</h4>
      <ol>
        ${recipe.steps.map((step) => `<li>${step.instruction}</li>`).join("")}
      </ol>
    `;

    // Handle Recipe Saving
    handleSaveRecipe(recipe);
  } catch (error) {
    console.error("Error fetching recipe data:", error);
  }
};

// Handle Saving Recipe
const handleSaveRecipe = (recipe) => {
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

  // Check if the recipe is already saved
  const isSaved = savedRecipes.some((r) => r.id === recipe.id);
  heartIcon.src = isSaved
    ? "./Assets/Etc/RecipeIcons/heart-solid.svg"
    : "./Assets/Etc/RecipeIcons/heart-regular.svg";

  heartIcon.addEventListener("click", () => {
    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

    if (!savedRecipes.some((r) => r.id === recipe.id)) {
      savedRecipes.push({ id: recipe.id, name: recipe.name });
      heartIcon.src = "./Assets/Etc/RecipeIcons/heart-solid.svg";
      alert("Recipe saved!");
    } else {
      savedRecipes = savedRecipes.filter((r) => r.id !== recipe.id);
      heartIcon.src = "./Assets/Etc/RecipeIcons/heart-regular.svg";
      alert("Recipe removed from saved recipes.");
    }

    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  });
};

// Load and display the recipe
document.addEventListener("DOMContentLoaded", () => displayRecipe(recipeId));
