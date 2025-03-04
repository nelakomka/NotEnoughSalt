const sendEmail = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const { email } = Object.fromEntries(formData);

  fetch("http://localhost:3000/emails", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  window.location.assign("Pages/ThankYou/ThankYou.html");
};
document.addEventListener("DOMContentLoaded", () => {
  const findRecipeButton = document.querySelector(".find_recipe_button");

  findRecipeButton.addEventListener("click", () => {
    // Get selected values from dropdowns
    const course = document.getElementById("find_recipe_course").value;
    const region = document.getElementById("find_recipe_region").value;
    const time = document.getElementById("find_recipe_time").value;

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
