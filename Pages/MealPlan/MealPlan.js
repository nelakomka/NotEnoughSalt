// Function checks if the user is logged in once the script loads.
(function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Ensure that isLoggedIn is explicitly "true"
  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "../Login/Login.html";
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const calendarEl = document.getElementById("calendar");
  const calendarContainer = document.querySelector(".calendar");

  // The container for dropdown and button
  const recipeSelectContainer = document.createElement("div");
  recipeSelectContainer.classList.add("recipe-select-container");

  // The dropdown select element
  const recipeSelect = document.createElement("select");
  recipeSelect.classList.add("meal-plan-dropdown");

  // The default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a saved recipe";
  recipeSelect.appendChild(defaultOption);

  // Load saved recipes into dropdown
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  if (savedRecipes.length > 0) {
    savedRecipes.forEach((recipe) => {
      const option = document.createElement("option");
      option.value = recipe;
      option.textContent = recipe;
      recipeSelect.appendChild(option);
    });
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
  });
  calendar.render();

  // Event listener for adding recipe to meal plan
  addToMealPlanBtn.addEventListener("click", () => {
    let selectedRecipe = recipeSelect.value;
    if (!selectedRecipe) {
      alert("Please select a recipe to add.");
      return;
    }

    calendar.addEvent({
      title: selectedRecipe,
      start: new Date().toISOString().split("T")[0], // Today's date
    });

    alert(`${selectedRecipe} added to the meal plan!`);
  });
});
