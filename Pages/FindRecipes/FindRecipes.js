const getRecipeContainer = document.querySelector('.recipes_grid');

const displayRecipes = async () => {
  const response = await fetch('http://localhost:3000/recipes');
  const recipes = await response.json();

  for (const element of recipes) {
    const recipe = document.createElement('div');

    recipe.classList.add('recipe_card');

    //recipe card displays
    recipe.innerHTML = `
            <a href="../Recipe/Recipe.html?recipeId=${element.id}">
              <img
                src=${element.image}
                alt=${element.name}
                height="230px"
                width="230px"
              />
              <div class="recipe_card_info">
                <div class="recipe_card_name_time">
                  <p>${element.name}</p>
                  <div class="recipe_card_time">
                    <img src="/Assets/Etc/Time.svg" alt="Clock" />
                    <p>${element.tags.cookingTime}</p>
                  </div>
                </div>
                <div>
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
                <div class="recipe_card_spicy>
                ${
                  element.tags.spicyLevel === 1
                    ? `<img src="/Assets/Etc/flame.svg" alt="Flame" />`
                    : ''
                }
                ${
                  element.tags.spicyLevel === 2
                    ? `<img src="/Assets/Etc/flame.svg" alt="Flame" />
                  <img src="/Assets/Etc/flame.svg" alt="Flame" />
                  `
                    : ''
                }
                ${
                  element.tags.spicyLevel === 3
                    ? `<img src="/Assets/Etc/flame.svg" alt="Flame" />
                  <img src="/Assets/Etc/flame.svg" alt="Flame" />
                  <img src="/Assets/Etc/flame.svg" alt="Flame" />`
                    : ''
                }
                </div>
                </div>
                
              </div>
            </a>
          `;

    getRecipeContainer.appendChild(recipe);
  }
};

displayRecipes();
