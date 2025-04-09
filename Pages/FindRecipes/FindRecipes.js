
const getRecipeContainer = document.querySelector('.recipes_grid');
const filters = document.querySelectorAll('.recipes_filter select');


const regionAliasMap = {
  europe: ['europe', 'eastern europe', 'western europe'],
  asia: ['asia', 'south asia', 'east asia', 'southeast asia'],
  americas: ['north america', 'south america', 'central america'],
  africa: ['africa'],
  oceania: ['oceania']
};


const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    mealType: params.get('course') || 'courses',
    region: params.get('region') || 'region',
    time: params.get('time') || 'time',
  };
};

const getDifficultyLabel = (difficulty) => {
  const difficultyMapping = { 1: 'basic', 2: 'intermediate', 3: 'advanced' };
  return difficultyMapping[difficulty] || 'difficulty';
};

const getSpiceLabel = (spiceLevel) => {
  const spiceMapping = { 0: 'mild', 1: 'medium', 2: 'hot', 3: 'extra_hot' };
  return spiceMapping[spiceLevel] || 'spice';
};

const checkDiet = (dietPreferences, selectedDiet) => {
  if (!dietPreferences) return selectedDiet === 'diet';
  return dietPreferences
    .map((d) => d.toLowerCase().replace(/[- ]/g, '_'))
    .includes(selectedDiet.toLowerCase());
};


const checkTime = (cookingTime, selectedTime) => {
  const normalized = selectedTime.toLowerCase();
  const timeValue = cookingTime.toLowerCase();

  if (normalized === 'under_30') return timeValue.includes('under 30');
  if (normalized === 'under_1') return timeValue.includes('under 1');
  if (normalized === 'more_1') return timeValue.includes('more than') || timeValue.includes('over');
  return true;
};


const generateDifficultyIcons = (difficulty) => {
  let icons = '';
  for (let i = 0; i < difficulty; i++) {
    icons += `<img src="/Assets/Etc/Saltshaker.svg" alt="Saltshaker" />`;
  }
  return icons;
};

const generateSpicyIcons = (spicyLevel) => {
  let icons = '';
  for (let i = 0; i < spicyLevel; i++) {
    icons += `<img src="/Assets/Etc/flame.svg" alt="Flame" />`;
  }
  return icons;
};

const displayRecipes = async () => {
  const response = await fetch('https://4c1be2ab503a4b95.mokky.dev/recipes');
  const data = await response.json();
  let recipes = data;

  const selectedFilters = {
    mealType: document.querySelector("select[name='courses']").value,
    difficulty: document.querySelector("select[name='difficulty']").value,
    spiceLevel: document.querySelector("select[name='spice']").value,
    region: document.querySelector("select[name='region']").value,
    diet: document.querySelector("select[name='diet']").value,
    time: document.querySelector("select[name='time']").value,
  };

  recipes = recipes.filter((recipe) => {
    const tags = recipe.tags;

    return (
      (selectedFilters.mealType === 'courses' ||
        (tags.mealTypes &&
          tags.mealTypes.some(
            (meal) => meal.toLowerCase() === selectedFilters.mealType.toLowerCase()
          ))) &&
      (selectedFilters.difficulty === 'difficulty' ||
        getDifficultyLabel(tags.difficulty) === selectedFilters.difficulty) &&
      (selectedFilters.spiceLevel === 'spice' ||
        getSpiceLabel(tags.spicyLevel) === selectedFilters.spiceLevel) &&
      (selectedFilters.region === 'region' ||
        (tags.region && regionAliasMap[selectedFilters.region]?.includes(tags.region.toLowerCase()))) &&
      (selectedFilters.diet === 'diet' ||
        checkDiet(tags.dietaryPreference, selectedFilters.diet)) &&
      (selectedFilters.time === 'time' ||
        checkTime(tags.cookingTime, selectedFilters.time))
    );
  });

  getRecipeContainer.innerHTML = '';

  if (recipes.length === 0) {
    getRecipeContainer.innerHTML = '<p>No recipes found for the selected filters.</p>';
    return;
  }

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe_card');
    recipeCard.innerHTML = `
      <a href="../Recipe/Recipe.html?recipeId=${recipe.id}">
        <img src="${recipe.image}" alt="${recipe.name}" height="230px" width="230px"/>
        <div class="recipe_card_info">
          <div class="recipe_card_name_time">
            <p>${recipe.name}</p>
            <div class="recipe_card_time">
              <img src="/Assets/Etc/Time.svg" alt="Clock" />
              <p>${recipe.tags.cookingTime}</p>
            </div>
          </div>
          <div>
            <div class="recipe_card_difficulty">${generateDifficultyIcons(recipe.tags.difficulty)}</div>
            <div class="recipe_card_spicy">${generateSpicyIcons(recipe.tags.spicyLevel)}</div>
          </div>
        </div>
      </a>
    `;
    getRecipeContainer.appendChild(recipeCard);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const queryParams = getQueryParams();

  if (queryParams.mealType !== 'courses') {
    const select = document.querySelector("select[name='courses']");
    if (select) select.value = queryParams.mealType;
  }
  if (queryParams.region !== 'region') {
    const select = document.querySelector("select[name='region']");
    if (select) select.value = queryParams.region;
  }
  if (queryParams.time !== 'time') {
    const select = document.querySelector("select[name='time']");
    if (select) select.value = queryParams.time;
  }

  displayRecipes();

  filters.forEach((filter) => {
    filter.addEventListener('change', displayRecipes);
  });
});
