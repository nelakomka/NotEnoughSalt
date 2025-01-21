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
  