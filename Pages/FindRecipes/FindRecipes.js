const getRecipeContainer = document.querySelector('.recipes_grid');

const displayRecipes = async () => {
  const response = await fetch('./../../RecipeCollection.json');
  const recipes = await response.json();

  for (const element of recipes.recipes) {
    const recipe = document.createElement('div');

    recipe.classList.add('recipe_card');

    recipe.innerHTML = `
            <a href="../Recipe/Recipe.html">
              <img
                src="/Assets/Food/MamalygaMujdei.png"
                alt=${element.name}
                height="260px"
              />
              <div class="recipe_card_info">
                <div class="recipe_card_name_time">
                  <p>${element.name}</p>
                  <div class="recipe_card_time">
                    <img src="/Assets/Etc/Time.svg" alt="Clock" />
                    <p>${element.tags.cookingTime}</p>
                  </div>
                </div>
                <div class="recipe_card_difficulty">
                ${
                  element.tags.difficulty === 1
                    ? `<img src="/Assets/Etc/Saltshaker.svg" alt="Saltshaker" />`
                    : ''
                }
                ${
                  element.tags.difficulty === 2
                    ? `<img src="/Assets/Etc/Saltshaker.svg" alt="Saltshaker" />
                  <img src="/Assets/Etc/Saltshaker.svg" alt="Saltshaker" />
                  `
                    : ''
                }
                ${
                  element.tags.difficulty === 3
                    ? `<img src="/Assets/Etc/Saltshaker.svg" alt="Saltshaker" />
                  <img src="/Assets/Etc/Saltshaker.svg" alt="Saltshaker" />
                  <img src="/Assets/Etc/Saltshaker.svg" alt="Saltshaker" />`
                    : ''
                }
                </div>
              </div>
            </a>
          `;

    getRecipeContainer.appendChild(recipe);
  }
};

displayRecipes();
