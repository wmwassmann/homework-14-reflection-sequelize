'use strict';
  
$(document).ready(() => {
  // This hooks in to our login form as well as the email input and password input. 
  const loginForm = $(`form.login`);
  const emailInput = $(`input#email-input`);
  const passwordInput = $(`input#password-input`);

  // On login submit we check to see if the user has entered an email and a password. If not, return the user to the start of the process.
  loginForm.on(`submit`, event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    // Return user to the start of the process.
    if (!userData.email || !userData.password) {
      return;
    }

    // This clears the login form if there is a user and password in userData.
    loginUser(userData.email, userData.password);
    emailInput.val(``);
    passwordInput.val(``);
  });

  // Login user takes in the email and password data and posts to the api/login. 
  function loginUser(email, password) {
    $.post(`/api/login`, {
      email,
      password
    })
      // On success, reroute window.location to /members page. 
      .then(() => {
        window.location.replace(`/members`);
      })
      .catch(err => {
        // error = error
        console.log(err);
      });
  }
});
