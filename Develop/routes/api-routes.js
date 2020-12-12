'use strict';

// This page handles the bulk of the api work, such as signup, login, and logout. 

// Requiring models
const db = require(`../models`);
// Requiring passport 
const passport = require(`../config/passport`);

module.exports = app => {
  // Passport is an authentication npm package and this allows us to validate our login credentials, send the user to their page, or return an error. 
  app.post(`/api/login`, passport.authenticate(`local`), (req, res) => {
    res.json(req.user);
  });

  // This routes the user to the signup page.  It hashes the users password in the user.js model. using bcrypt.hashSync
  app.post(`/api/signup`, (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
    // if successful, the user may login
      .then(() => {
        const statusCode = 307;
        res.redirect(statusCode, `/api/login`);
      })

    // if failure, catch to an error.
      .catch(err => {
        const unauthenticatedStatusCode = 401;
        res.status(unauthenticatedStatusCode).json(err);
      });
  });

  // Logout route, directs to the main page. '/'
  app.get(`/logout`, (req, res) => {
    req.logout();
    res.redirect(`/`);
  });

  // Route for pulling data.
  app.get(`/api/user_data`, (req, res) => {
    if (!req.user) {
      // This checks if the user is logged in, and if not, send empty json. 
      res.json({});
    } else {
      // Otherwise send back the user's email and id, but no password as that could potentially be a breech in security.       
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
