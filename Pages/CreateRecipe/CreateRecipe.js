function addIngredientField() {
  const ingredientsSection = document.querySelector('.ingredients-section');
  const newField = document.createElement('div');
  newField.classList.add('ingredient-item');
  newField.innerHTML = `
      <input type="text" name="ingredient[]" placeholder="Ingredient name" required />
      <input type="text" name="quantity[]" placeholder="Quantity (e.g., 1 cup)" required />
    `;
  ingredientsSection.appendChild(newField);
}

//form send to database
function submissionRecipe(event) {
  event.preventDefault();

  const recipe = {
    title: document.getElementById('recipe-title').value,
    origin: document.getElementById('recipe-origin').value,
    mealType: document.getElementById('meal-type').value,
    cookingTime: document.getElementById('cooking-time').value,
    servings: document.getElementById('servings').value,
    ingredients: [],
    instructions: document.getElementById('recipe-instructions').value,
    story: document.getElementById('recipe-story').value,
  };

  //ingredient list
  const ingredientNames = document.getElementsByName('ingredient[]');
  const ingredientQuantities = document.getElementsByName('quantity[]');

  for (let i = 0; i < ingredientNames.length; i++) {
    if (ingredientNames[i].value && ingredientQuantities[i].value) {
      recipe.ingredients.push({
        name: ingredientNames[i].value,
        quantity: ingredientQuantities[i].value,
      });
    }
  }

  fetch('https://4c1be2ab503a4b95.mokky.dev/submissionRecipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  })
    .then((response) => response.json())
    .then(() => {
      window.location.assign('../ThankYou/ThankYou.html');
    })
    .catch((error) => {
      console.error('Error submitting recipe:', error);
      alert('Failed to submit recipe.');
    });
}
