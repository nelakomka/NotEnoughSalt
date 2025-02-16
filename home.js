const form = document.getElementById('myForm');

const sendEmail = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const { email } = Object.fromEntries(formData);

  fetch('http://localhost:3000/emails', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  window.location.assign("Pages/ThankYou/ThankYou.html")
};
