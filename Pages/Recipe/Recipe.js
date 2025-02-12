const getRecipeName = document.querySelector('.recipe_title');
const getRecipeCountry = document.querySelector('.country');
const getRecipeMealType = document.querySelector('.meal_time');
const getRecipeTime = document.querySelector('.recipe_time');
const getRecipePeople = document.querySelector('.recipe_people');
const getRecipeIngrediets = document.querySelector('.recipe_ingredients');
const getRecipeImage = document.querySelector('.recipe_image_img');
const getRecipeInstructions = document.querySelector('.recipe_instructions');

const displayRecipe = async (recipeId) => {
  const response = await fetch(`http://localhost:3000/recipes/${recipeId}`);
  const recipes = await response.json();

  getRecipeName.innerHTML = recipes.name;
  getRecipeCountry.innerHTML = recipes.tags.cuisine;
  getRecipeTime.innerHTML = recipes.tags.cookingTime;
  getRecipePeople.innerHTML = `${recipes.tags.servings} people`;
  getRecipeIngrediets.innerHTML = `
    <h1>Ingredients</h1>
    <ul>
      ${recipes.ingredients
        ?.map(
          (element) =>
            `<li><input type="checkbox">${element.name}</input></li>`,
        )
        .join('')}
    </ul>
  `;
  getRecipeImage.setAttribute('src', recipes.image);
  getRecipeInstructions.innerHTML = `
    <h4>Instructions</h4>
    <ol>
      ${recipes.steps
        .map((element) => `<li>${element.instruction}</li>`)
        .join('')}
    </ol>
  `;
};

displayRecipe(new URLSearchParams(window.location.search).get('recipeId'));
