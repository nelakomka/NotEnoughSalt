const getRecipeContainer = document.querySelector('.recipes_grid');
const filters = document.querySelectorAll('.recipes_filter select');

// Function to extract query parameters from URL
const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    mealType: params.get('course') || 'courses',
    region: params.get('region') || 'region',
    time: params.get('time') || 'time',
  };
};

// Fetch and display recipes with filtering
const displayRecipes = async () => {
  const response = await fetch('https://4c1be2ab503a4b95.mokky.dev/recipes');
  const data = await response.json();
  let recipes = data;

  // Get selected filter values (query params OR dropdown selections)
  const selectedFilters = {
    mealType:
      document.querySelector("select[name='courses']").value ||
      getQueryParams().mealType,
    difficulty:
      document.querySelector("select[name='difficulty']").value || 'difficulty',
    spiceLevel: document.querySelector("select[name='spice']").value || 'spice',
    region:
      document.querySelector("select[name='region']").value ||
      getQueryParams().region,
    diet: document.querySelector("select[name='diet']").value || 'diet',
    time:
      document.querySelector("select[name='time']").value ||
      getQueryParams().time,
  };

  // Filter recipes based on user selection
  recipes = recipes.filter((recipe) => {
    const { tags } = recipe;

    return (
      (selectedFilters.mealType === 'courses' ||
        (tags.mealTypes &&
          tags.mealTypes.some(
            (meal) =>
              meal.toLowerCase() === selectedFilters.mealType.toLowerCase(),
          ))) &&
      (selectedFilters.difficulty === 'difficulty' ||
        getDifficultyLabel(tags.difficulty) === selectedFilters.difficulty) &&
      (selectedFilters.spiceLevel === 'spice' ||
        getSpiceLabel(tags.spicyLevel) === selectedFilters.spiceLevel) &&
      (selectedFilters.region === 'region' ||
        tags.cuisine.toLowerCase() === selectedFilters.region.toLowerCase()) &&
      (selectedFilters.diet === 'diet' ||
        checkDiet(tags.dietaryPreference, selectedFilters.diet)) &&
      (selectedFilters.time === 'time' ||
        checkTime(tags.cookingTime, selectedFilters.time))
    );
  });

  // Clear previous recipes
  getRecipeContainer.innerHTML = '';

  // Display filtered recipes
  if (recipes.length === 0) {
    getRecipeContainer.innerHTML =
      '<p>No recipes found for the selected filters.</p>';
    return;
  }

  recipes.forEach((recipe) => {
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
};

// Helper Functions for Label Mapping
const getDifficultyLabel = (difficulty) => {
  const difficultyMapping = { 1: 'basic', 2: 'intermediate', 3: 'advanced' };
  return difficultyMapping[difficulty] || 'difficulty';
};

const getSpiceLabel = (spiceLevel) => {
  const spiceMapping = { 0: 'mild', 1: 'medium', 2: 'hot', 3: 'extra_hot' };
  return spiceMapping[spiceLevel] || 'spice';
};

const checkDiet = (dietPreferences, selectedDiet) => {
  if (!dietPreferences) return selectedDiet === 'diet'; // Show all if no dietary info
  return dietPreferences.includes(selectedDiet);
};

const checkTime = (cookingTime, selectedTime) => {
  const timeMapping = {
    'Under 30 minutes': 'under_30_minutes',
    'Under 1 hour': 'under_1_hour',
    'Over 1 hour': 'over_1_hour',
  };
  return timeMapping[cookingTime] === selectedTime;
};

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

// Attach event listeners to filters
filters.forEach((filter) => {
  filter.addEventListener('change', displayRecipes);
});

// Load and display recipes initially with query filters
displayRecipes();
