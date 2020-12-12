'use strict';

const passport = require(`passport`);
// LocalStrategy or passport-local is a middleware package that autheticates.
const LocalStrategy = require(`passport-local`).Strategy;

const db = require(`../models`);

// Passport, being our authenticator, needs to be told where it's going to check for authetication.
// In this case, we are using a new LocalStrategy.
passport.use(
  new LocalStrategy(
    // Requires the user to sign in with their email.
    {
      usernameField: `email`
    },
    (email, password, done) => {
      // This finds the user's email
      db.User.findOne({
        where: {
          email
        }
      }).then(dbUser => {
        // If no email is found matching the one given, an error is thrown and the user is returned. 
        if (!dbUser) {
          return done(null, false, {
            message: `Incorrect email.`
          });
        }
        // This checks if the password is incorrect.  If so - throw error.
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: `Incorrect password.`
          });
        }
        // Otherwise the user is logged in. 
        return done(null, dbUser);
      });
    }
  )
);

// I'm unsure what the purpose of serializing the user is. 
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});


module.exports = passport;
