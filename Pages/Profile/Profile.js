document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const categories = document.querySelectorAll('.profile-category');
  
    tabs.forEach((tab) => {
      tab.addEventListener('click', (event) => {
        // Remove active class from all tabs
        tabs.forEach((t) => t.classList.remove('active'));
  
        categories.forEach((category) => category.classList.remove('active'));
  
        tab.classList.add('active');
  
        const categoryId = tab.getAttribute('data-category');
        const activeCategory = document.getElementById(categoryId);
  
        if (activeCategory) {
          activeCategory.classList.add('active');
        }
      });
    });
  });