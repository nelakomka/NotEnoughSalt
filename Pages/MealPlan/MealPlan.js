// Function checkes if the user is logged in once the script loads.
(function() {

    const isLoggedIn = localStorage.getItem('isLoggedIn');
  
    // If the user is not logged in this should redirect them to the login page.
    if (!isLoggedIn) {
      window.location.href = "../Login/Login.html";
    }
   
  })();
  