const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const emailValidator = require("email-validator");

const User = require("../models/user");
const config = require("../config");

const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  isValidEmail = emailValidator.validate(email);
  const findUserBy = isValidEmail ? { email: email } : { username: email };
  // if it is the correct email and password
  // otherwise, call done with false
  User.find({}, function(user) {
    console.log(user);
  });

  User.findOne(findUserBy, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

//setup options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJWt.fromHeader("authorization"),
  secretOrKey: config.secret
};

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // check user db if payload exists
  // if user exist call 'done' with user
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) {
      // error object, with a false / null
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
