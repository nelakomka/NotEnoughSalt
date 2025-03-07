document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-button');
  const categories = document.querySelectorAll('.faq-category');

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

  // Add functionality for FAQ toggles
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
});

//form send to database
const sendFeedback = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  fetch('http://localhost:3000/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // headers in json
    body: JSON.stringify(data), // all fields in one line
  });

  window.location.assign('../ThankYou/ThankYou.html');
};
