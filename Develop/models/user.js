'use strict';

// Requiring bcrypt for password hashing.
// Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require(`bcryptjs`);

// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define(`User`, {
    // Thie checks if the email is correctly written and is unique to prevent multiple accounts with the same email.
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // This requires a password.  Null: false.
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // This function checks to see if the unhashed password matches the one initially stored. 
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // This hook automatically hashes a user's password. 
  User.addHook(`beforeCreate`, user => {
    const rounds = 10;
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(rounds),
      null
    );
  });
  return User;
};
