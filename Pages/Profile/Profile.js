document.addEventListener('DOMContentLoaded', async () => {
  // Profile Page Tabs Logic
  const tabs = document.querySelectorAll('.tab-button');
  const categories = document.querySelectorAll('.profile-category');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      categories.forEach((category) => category.classList.remove('active'));

      tab.classList.add('active');

      const categoryId = tab.getAttribute('data-category');
      const activeCategory = document.getElementById(categoryId);
      if (activeCategory) activeCategory.classList.add('active');
    });
  });

  // Load Saved Recipes
  const savedRecipesContainer = document.querySelector('.recipes_grid');
  let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

  if (savedRecipes.length === 0) {
    savedRecipesContainer.innerHTML = '<p>No saved recipes yet.</p>';
  } else {
    try {
      const response = await fetch(
        'https://4c1be2ab503a4b95.mokky.dev/recipes',
      );
      if (!response.ok) throw new Error('Failed to load recipes.');

      const allRecipes = await response.json();

      savedRecipesContainer.innerHTML = savedRecipes
        .map((savedRecipe) => {
          let recipeData = allRecipes.find(
            (recipe) => String(recipe.id) === String(savedRecipe.id),
          );

          if (!recipeData) return '';

          return `
            <div class="recipe_card">
              <a href="../Recipe/Recipe.html?recipeId=${encodeURIComponent(
                recipeData.id,
              )}">
                <img src="${recipeData.image}" alt="${
            recipeData.name
          }" height="260px" />
                <div class="recipe_card_info">
                  <p>${recipeData.name}</p>
                </div>
              </a>
              <button class="delete-recipe" data-recipe-id="${
                recipeData.id
              }">Remove</button>
            </div>
          `;
        })
        .join('');

      document.querySelectorAll('.delete-recipe').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const recipeIdToRemove = e.target.dataset.recipeId;
          savedRecipes = savedRecipes.filter(
            (recipe) => String(recipe.id) !== String(recipeIdToRemove),
          );

          localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
          e.target.parentElement.remove();

          if (savedRecipes.length === 0) {
            savedRecipesContainer.innerHTML = '<p>No saved recipes yet.</p>';
          }
        });
      });
    } catch (error) {
      console.error('Error loading saved recipes:', error);
      savedRecipesContainer.innerHTML =
        '<p>Failed to load saved recipes. Please try again later.</p>';
    }
  }

  // Profile Picture Update
  const profileImage = document.querySelector('.change_image img');
  const imageUploadBtn = document.querySelector('.change_image button');

  const savedProfileImage = localStorage.getItem('profileImage');
  if (savedProfileImage) profileImage.src = savedProfileImage;

  imageUploadBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          profileImage.src = e.target.result;
          localStorage.setItem('profileImage', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });

    input.click();
  });

  // Name and Password Update
  const nameInput = document.getElementById('name');
  const passwordInput = document.getElementById('password');

  const savedName = localStorage.getItem('userName');
  if (savedName) nameInput.value = savedName;

  document
    .querySelector('.change_settings form')
    .addEventListener('submit', (event) => {
      event.preventDefault();

      const newName = nameInput.value.trim();
      const newPassword = passwordInput.value.trim();

      if (newName) {
        localStorage.setItem('userName', newName);
        alert('Profile name updated!');
      }

      if (newPassword) {
        alert('Password Update is unavailable');
      }
    });

  // Recipe Preferences
  const preferenceCheckboxes = document.querySelectorAll(
    ".recipe_prefrence_lists_checkboxes input[type='checkbox']",
  );
  const savePreferencesBtn = document.querySelector(
    '.recipe_preferences button',
  );

  const savedPreferences =
    JSON.parse(localStorage.getItem('recipePreferences')) || [];
  preferenceCheckboxes.forEach((checkbox) => {
    if (savedPreferences.includes(checkbox.value)) checkbox.checked = true;
  });

  savePreferencesBtn.addEventListener('click', () => {
    const selectedPreferences = [...preferenceCheckboxes]
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    localStorage.setItem(
      'recipePreferences',
      JSON.stringify(selectedPreferences),
    );
    alert('Recipe preferences saved!');
  });
});
