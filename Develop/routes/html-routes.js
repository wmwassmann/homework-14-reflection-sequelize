'use strict';

// DEPENDANCIES
// Path is an npm package allows us to use relative routes to connect with html files. 
const path = require(`path`);

// isAuthenticated checks to see if a user is logged in. 
const isAuthenticated = require(`../config/middleware/isAuthenticated`);

module.exports = app => {
  app.get(`/`, (req, res) => {
    // This routes a registered user to the members page
    if (req.user) {
      res.redirect(`/members`);
    }
    res.sendFile(path.join(__dirname, `../public/signup.html`));
  });

  app.get(`/login`, (req, res) => {
    // This does the same thng as the previous function though it selects from login rather than main. 
    if (req.user) {
      res.redirect(`/members`);
    }
    res.sendFile(path.join(__dirname, `../public/login.html`));
  });

  // This uses isAuthenticated to check the user's authentication, and if so it rounts them to their member's page, otherwise it reroutes them to the login page. 
  app.get(`/members`, isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, `../public/members.html`));
  });
};
