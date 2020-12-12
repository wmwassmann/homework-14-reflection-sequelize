'use strict';

// This page is very similar to the login sheet. 
$(document).ready(() => {
  // This hooks in to our login form as well as the email input and password input. 
  const signUpForm = $(`form.signup`);
  const emailInput = $(`input#email-input`);
  const passwordInput = $(`input#password-input`);

  // This checks for empty fields for password and email. 
  signUpForm.on(`submit`, event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    // if empty, return to the start. 
    if (!userData.email || !userData.password) {
      return;
    }
    // otherwise, take in the email and password data and run the signUpUser function below
    signUpUser(userData.email, userData.password);
    emailInput.val(``);
    passwordInput.val(``);
  });

  // posts the user's email and password to the signup route and on success will reroute the new user to their new member's page. 
  function signUpUser(email, password) {
    $.post(`/api/signup`, {
      email,
      password
    })
      .then(() => {
        window.location.replace(`/members`);
        // error = error
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    const numFadeMs = 500;
    $(`#alert .msg`).text(err.responseJSON);
    $(`#alert`).fadeIn(numFadeMs);
  }
});
