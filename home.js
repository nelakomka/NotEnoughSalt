const getExploreMore = document.querySelector('.explore_more_images');

const sendEmail = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const { email } = Object.fromEntries(formData);

  fetch('http://localhost:3000/emails', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  window.location.assign('Pages/ThankYou/ThankYou.html');
};

document.addEventListener('DOMContentLoaded', () => {
  const findRecipeButton = document.querySelector('.find_recipe_button');

  findRecipeButton.addEventListener('click', () => {
    // Get selected values from dropdowns
    const course = document.getElementById('find_recipe_course').value;
    const region = document.getElementById('find_recipe_region').value;
    const time = document.getElementById('find_recipe_time').value;

    // Construct query parameters
    const queryParams = new URLSearchParams({
      course: course,
      region: region,
      time: time,
    });

    // Redirect to FindRecipes.html with query parameters
    window.location.href = `./Pages/FindRecipes/FindRecipes.html?${queryParams.toString()}`;
  });
});

//randomizing 4 recipes from db
async function displayRandomRecipe() {
  const response = await fetch('http://localhost:3000/recipes', {
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
