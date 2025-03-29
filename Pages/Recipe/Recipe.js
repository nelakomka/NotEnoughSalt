const getRecipeName = document.querySelector('.recipe_title');
const getRecipeCountry = document.querySelector('.country');
const getRecipeMealType = document.querySelector('.meal_time');
const getRecipeTime = document.querySelector('.recipe_time');
const getRecipePeople = document.querySelector('.recipe_people');
const getRecipeIngredients = document.querySelector('.recipe_ingredients');
const getRecipeImage = document.querySelector('.recipe_image_img');
const getRecipeInstructions = document.querySelector('.recipe_instructions');
const heartIcon = document.querySelector('.heart-icon');
const getRecipeContainer = document.querySelector('.recipe_container');

// Retrieve recipe ID from URL
const recipeId = new URLSearchParams(window.location.search).get('recipeId');

const displayRecipe = async (recipeId) => {
  if (!recipeId) {
    console.error('Recipe ID not provided.');
    return;
  }

  try {
    // Fetch the recipe data dynamically
    const response = await fetch('https://4c1be2ab503a4b95.mokky.dev/recipes');
    const data = await response.json();

    // Ensure recipe ID comparison matches expected type (string vs. number issue)
    const recipe = data.find((r) => r.id.toString() === recipeId.toString());

    if (!recipe) {
      console.error('Recipe not found.');
      return;
    }

    // Populate Recipe Details
    getRecipeName.textContent = recipe.name;
    getRecipeCountry.textContent = recipe.tags.cuisine;
    getRecipeMealType.textContent = recipe.tags.mealTypes.join(', ');
    getRecipeTime.textContent = recipe.tags.cookingTime;
    getRecipePeople.textContent = `${recipe.tags.servings} servings`;
    getRecipeImage.setAttribute('src', recipe.image);

    getRecipeIngredients.innerHTML = `
      <h1>Ingredients</h1>
      <ul>
        ${recipe.ingredients
          ?.map(
            (ingredient) =>
              `<li><input type="checkbox"> ${ingredient.name}</li>`,
          )
          .join('')}
      </ul>
    `;

    getRecipeInstructions.innerHTML = `
      <h4>Instructions</h4>
      <ol>
        ${recipe.steps.map((step) => `<li>${step.instruction}</li>`).join('')}
      </ol>
    `;

    // Handle Recipe Saving
    handleSaveRecipe(recipe);
  } catch (error) {
    console.error('Error fetching recipe data:', error);
  }
};

// Handle Saving Recipe
const handleSaveRecipe = (recipe) => {
  let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

  // Check if the recipe is already saved
  const isSaved = savedRecipes.some((r) => r.id === recipe.id);
  heartIcon.src = isSaved
    ? '/Assets/Etc/RecipeIcons/heart-solid.svg'
    : '/Assets/Etc/RecipeIcons/heart-regular.svg';

  heartIcon.addEventListener('click', () => {
    let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

    if (!savedRecipes.some((r) => r.id === recipe.id)) {
      savedRecipes.push({ id: recipe.id, name: recipe.name });
      heartIcon.src = '/Assets/Etc/RecipeIcons/heart-solid.svg';
    } else {
      savedRecipes = savedRecipes.filter((r) => r.id !== recipe.id);
      heartIcon.src = '/Assets/Etc/RecipeIcons/heart-regular.svg';
      alert('Recipe removed from saved recipes.');
    }

    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  });
};

// Load and display the recipe
document.addEventListener('DOMContentLoaded', () => displayRecipe(recipeId));

// Generate Difficulty Icons
const generateDifficultyIcons = (difficulty) => {
  let icons = '';
  for (let i = 0; i < difficulty; i++) {
    icons += `<img src="/Assets/Etc/Saltshaker.svg" alt="Saltshaker" />`;
  }
  return icons;
};

// Generate Spice Level Icons
const generateSpicyIcons = (spicyLevel) => {
  let icons = '';
  for (let i = 0; i < spicyLevel; i++) {
    icons += `<img src="/Assets/Etc/flame.svg" alt="Flame" />`;
  }
  return icons;
};

//randomizing 3 recipes from db
async function displayRandomRecipe() {
  const response = await fetch('https://4c1be2ab503a4b95.mokky.dev/recipes', {
    method: 'GET',
  });

  const data = await response.json();

  const randomizedRecipes = data
    .toSorted(() => Math.random() - 0.5)
    .slice(0, 3);

  randomizedRecipes.forEach((recipe) => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe_card');
    recipeCard.innerHTML = `
            <a href="../Recipe/Recipe.html?recipeId=${recipe.id}">
                <img src="${recipe.image}" alt="${
      recipe.name
    }" height="230px" width="230px"/>
                <div class="recipe_card_info">
                    <div class="recipe_card_name_time">
                        <p>${recipe.name}</p>
                        <div class="recipe_card_time">
                            <img src="/Assets/Etc/Time.svg" alt="Clock" />
                            <p>${recipe.tags.cookingTime}</p>
                        </div>
                    </div>
                    <div>                      
                        <div class="recipe_card_difficulty">${generateDifficultyIcons(
                          recipe.tags.difficulty,
                        )}</div>
                        <div class="recipe_card_spicy">${generateSpicyIcons(
                          recipe.tags.spicyLevel,
                        )}</div>
                    </div>
                </div>
            </a>
        `;
    getRecipeContainer.appendChild(recipeCard);
  });
}

displayRandomRecipe();
