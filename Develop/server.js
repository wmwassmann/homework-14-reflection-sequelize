'use strict';
// This page is the focal page that will handle the different npm packages, configuring ports, initializing your express app middleware, databases, and routing.
// I think of the server.js as the brain of the application. 

// DEPENDANCIES
// Setting up the npm packages express for robust routing, and express-session to allow each user of you APIs to be assigned a unique session and state. 
const express = require(`express`);
const session = require(`express-session`);
// Setting up Passport, and authentication npm package
const passport = require(`./config/passport`);

// Setting up port 3000 as the default port.
const defaultPort = 3000;
const PORT = process.env.PORT || defaultPort;
// Requiring ./models for syncronization purposes.
const db = require(`./models`);

// Setting up the express app and middleware.
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`));
app.use(
  // Session tracks a logged in users's  status. 
  session({ secret: `keyboard cat`, resave: true, saveUninitialized: true })
);
// Passport handles the authentication. 
app.use(passport.initialize());
app.use(passport.session());

// Requiring both of the routes from our routing folder. 

// html handles what we see on the page
require(`./routes/html-routes.js`)(app);

// api handles the api calls 
require(`./routes/api-routes.js`)(app);

// This synchronizes our database. 
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      `==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.`,
      PORT,
      PORT
    );
  });
});
