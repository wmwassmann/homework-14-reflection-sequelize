'use strict';

$(document).ready(() => {
  // A simple function to check the user logged in and display their data on the page.
  $.get(`/api/user_data`).then(data => {
    $(`.member-name`).text(data.email);
  });
});
