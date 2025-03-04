// Function checks if the user is logged in once the script loads.
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "../Login/Login.html";
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const calendarEl = document.getElementById("calendar");
  const calendarContainer = document.querySelector(".calendar");
  const groceryListContainer = document.querySelector(
    ".grocery_ingridients_lists"
  );
  const generateGroceryBtn = document.createElement("button");

  let selectedDate = null;
  let mealPlanRecipes = []; // Stores recipes added to the meal plan

  // Create container for dropdown and button
  const recipeSelectContainer = document.createElement("div");
  recipeSelectContainer.classList.add("recipe-select-container");

  // Dropdown select element
  const recipeSelect = document.createElement("select");
  recipeSelect.classList.add("meal-plan-dropdown");

  // Default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a saved recipe";
  recipeSelect.appendChild(defaultOption);

  // Fetch saved recipes from localStorage
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

  if (savedRecipes.length > 0) {
    try {
      const response = await fetch("/db.json");
      const data = await response.json();
      const allRecipes = data.recipes;

      savedRecipes.forEach((savedRecipe) => {
        let recipeData = allRecipes.find(
          (recipe) => recipe.id === String(savedRecipe.id)
        );

        if (recipeData) {
          const option = document.createElement("option");
          option.value = recipeData.id;
          option.textContent = recipeData.name;
          recipeSelect.appendChild(option);
        }
      });
    } catch (error) {
      console.error("Error loading saved recipes:", error);
    }
  } else {
    recipeSelect.disabled = true;
  }

  // Create "Add to Meal Plan" button
  const addToMealPlanBtn = document.createElement("button");
  addToMealPlanBtn.innerText = "Add to Meal Plan";
  addToMealPlanBtn.classList.add("meal-plan-btn");

  // Append elements to container and calendar section
  recipeSelectContainer.appendChild(recipeSelect);
  recipeSelectContainer.appendChild(addToMealPlanBtn);
  calendarContainer.appendChild(recipeSelectContainer);

  // Initialize FullCalendar
  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    selectable: true,
    dateClick: function (info) {
      selectedDate = info.dateStr;
    },
  });
  calendar.render();

  // Event listener for adding a recipe to the meal plan
  addToMealPlanBtn.addEventListener("click", async () => {
    let selectedRecipeId = recipeSelect.value;
    if (!selectedRecipeId) {
      alert("Please select a recipe to add.");
      return;
    }

    if (!selectedDate) {
      alert("Please select a date on the calendar.");
      return;
    }

    try {
      const response = await fetch("/db.json");
      const data = await response.json();
      const recipe = data.recipes.find(
        (r) => r.id === String(selectedRecipeId)
      );

      if (recipe) {
        calendar.addEvent({
          title: recipe.name,
          start: selectedDate,
        });

        // Store the added recipe in mealPlanRecipes
        mealPlanRecipes.push(recipe);
        alert(`${recipe.name} added to the meal plan on ${selectedDate}!`);
      } else {
        alert("Recipe not found. Please refresh the page and try again.");
      }
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
  });

  // Generate Grocery List Button
  generateGroceryBtn.innerText = "Generate Grocery List";
  generateGroceryBtn.classList.add("meal-plan-btn");
  calendarContainer.appendChild(generateGroceryBtn);

  // Function to generate grocery list
  function generateGroceryList() {
    groceryListContainer.innerHTML = ""; // Clear previous list

    if (mealPlanRecipes.length === 0) {
      alert("No recipes have been added to the meal plan.");
      return;
    }

    let uniqueIngredients = new Map();

    // Process all recipes in the meal plan
    mealPlanRecipes.forEach((recipe) => {
      const recipeContainer = document.createElement("div");
      recipeContainer.classList.add("recipe_grocery_list");

      const recipeTitle = document.createElement("div");
      recipeTitle.innerHTML = `<h3>${recipe.name}</h3>`;

      const ingredientList = document.createElement("div");
      ingredientList.classList.add("recipe_grocery_list_checkboxes");

      recipe.ingredients.forEach((ingredient) => {
        if (!uniqueIngredients.has(ingredient.name)) {
          uniqueIngredients.set(ingredient.name, ingredient);
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = ingredient.name.replace(/\s+/g, "_");
        checkbox.name = ingredient.name;
        checkbox.value = ingredient.name;

        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = ` ${ingredient.name}`;

        ingredientList.appendChild(checkbox);
        ingredientList.appendChild(label);
        ingredientList.appendChild(document.createElement("br"));
      });

      recipeContainer.appendChild(recipeTitle);
      recipeContainer.appendChild(ingredientList);
      groceryListContainer.appendChild(recipeContainer);
    });

    alert("Grocery List Generated!");
  }

  // Event listener for Generate Grocery List button
  generateGroceryBtn.addEventListener("click", generateGroceryList);
});
