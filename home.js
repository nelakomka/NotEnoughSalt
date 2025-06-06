const getExploreMore = document.querySelector('.explore_more_images');
const getByCategoryAll = document.querySelectorAll('.by_category_all');

const sendEmail = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  fetch('https://4c1be2ab503a4b95.mokky.dev/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(() => {
      window.location.assign('Pages/ThankYou/ThankYou.html');
    });
};

document.addEventListener('DOMContentLoaded', () => {
  const findRecipeButton = document.querySelector('.find_recipe_button');

  findRecipeButton.addEventListener('click', () => {
    // Get selected values from dropdowns
    const course = document.getElementById('find_recipe_course').value;
    const region = document.getElementById('find_recipe_region').value;
    const time = document.getElementById('find_recipe_time').value;

    const queryParams = new URLSearchParams();

    if (course && course.toLowerCase() !== 'by course') queryParams.append('course', course);
    if (region && region.toLowerCase() !== 'by region') queryParams.append('region', region);
    if (time && time.toLowerCase() !== 'by time') queryParams.append('time', time);

    // Redirect only if any filters are applied
    window.location.href = `./Pages/FindRecipes/FindRecipes.html?${queryParams.toString()}`;
  });
});

//randomizing 4 recipes from db
async function displayRandomRecipe() {
  const response = await fetch('https://4c1be2ab503a4b95.mokky.dev/recipes', {
    method: 'GET',
  });

  const data = await response.json();

  const randomizedRecipes = data
    .toSorted(() => Math.random() - 0.5)
    .slice(0, 4);

  randomizedRecipes.forEach((recipe) => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe_card');
    recipeCard.innerHTML = `
            <a href="/Pages/Recipe/Recipe.html?recipeId=${recipe.id}">
                <img src="${recipe.image}" alt="${recipe.name}" height="250px" width="250px"/>
            </a>
        `;
    getExploreMore.appendChild(recipeCard);
  });
}

displayRandomRecipe();

//random recipes for ecah category links
async function getRandomRecipeByCategory() {
  const response = await fetch('https://4c1be2ab503a4b95.mokky.dev/recipes', {
    method: 'GET',
  });

  const data = await response.json();

  const breakfast = filtratedMealType('Breakfast', data);
  const lunch = filtratedMealType('Lunch', data);
  const dinner = filtratedMealType('Dinner', data);
  const dessert = filtratedMealType('Dessert', data);

  const randomizedBreakfast = breakfast.toSorted(() => Math.random() - 0.5)[0];
  const randomizedLunch = lunch.toSorted(() => Math.random() - 0.5)[0];
  const randomizedDinner = dinner.toSorted(() => Math.random() - 0.5)[0];
  const randomizedDessert = dessert.toSorted(() => Math.random() - 0.5)[0];

  const arrayIds = [
    randomizedBreakfast,
    randomizedLunch,
    randomizedDinner,
    randomizedDessert,
  ];

  for (let i = 0; i < arrayIds.length; i++) {
    const element = arrayIds[i];

    getByCategoryAll[i]
      .querySelector('a')
      .setAttribute('href', `/Pages/Recipe/Recipe.html?recipeId=${element.id}`);
  }
}

function filtratedMealType(category, data) {
  return data.filter((elem) => elem.tags.mealTypes.includes(category));
}

getRandomRecipeByCategory();
