document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-button');
  const categories = document.querySelectorAll('.profile-category');

  tabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove('active'));

      // Hide all FAQ categories
      categories.forEach((category) => category.classList.remove('active'));

      // Add active class to the clicked tab
      tab.classList.add('active');

      // Get the corresponding FAQ category
      const categoryId = tab.getAttribute('data-category');
      const activeCategory = document.getElementById(categoryId);

      // Show the selected FAQ category
      if (activeCategory) {
        activeCategory.classList.add('active');
      }
    });
  });
});
