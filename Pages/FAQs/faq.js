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

//chat

const getChatClass = document.querySelector('.keep_in_touch_top_bot');
const getChatBtnToggle = document.querySelector(
  '.keep_in_touch_top_bot_toggle',
);
const getChatChatSection = document.querySelector(
  '.keep_in_touch_top_bot_chat',
);
const getChatCalcSection = document.querySelector(
  '.keep_in_touch_top_bot_calc',
);

const toggleChat = () => {
  getChatClass.classList.toggle('close');
};

const toggleChatSelect = (event, type) => {
  for (const node of getChatBtnToggle.childNodes) {
    if (node.classList) {
      node.classList.remove('active');
    }
  }

  event.target.classList.toggle('active');

  if (type === 'chat') {
    getChatChatSection.classList.remove('close');
    getChatCalcSection.classList.add('close');
  } else {
    getChatChatSection.classList.add('close');
    getChatCalcSection.classList.remove('close');
  }
};
