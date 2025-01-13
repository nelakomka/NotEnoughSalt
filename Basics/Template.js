const getChatClass = document.querySelector(".keep_in_touch_top_bot");
const getChatBtnToggle = document.querySelector(
  ".keep_in_touch_top_bot_toggle"
);
const getChatChatSection = document.querySelector(
  ".keep_in_touch_top_bot_chat"
);
const getChatCalcSection = document.querySelector(
  ".keep_in_touch_top_bot_calc"
);

const toggleChat = () => {
  getChatClass.classList.toggle("close");
};

const toggleChatSelect = (event, type) => {
  for (const node of getChatBtnToggle.childNodes) {
    if (node.classList) {
      node.classList.remove("active");
    }
  }

  event.target.classList.toggle("active");

  if (type === "chat") {
    getChatChatSection.classList.remove("close");
    getChatCalcSection.classList.add("close");
  } else {
    getChatChatSection.classList.add("close");
    getChatCalcSection.classList.remove("close");
  }
};
