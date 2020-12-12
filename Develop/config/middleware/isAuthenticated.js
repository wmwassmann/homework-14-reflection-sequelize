'use strict';

// This isAuthenticated.js checks if the user is logged in. If so they are passed along to the next phase of the login. 
module.exports = function(req, res, next) {
  if (req.user) {
    return next();
  }

  // If a user is not logged in, they are sent to the main page '/'.
  return res.redirect(`/`);
};
