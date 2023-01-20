const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
// const dotenv = require("dotenv");
require('dotenv').config();
const User = require("../models/User");
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  })
});
passport.use(
  new GoogleStrategy({
    callbackURL: "/auth/google/redirect",
    clientID: process.env.GCLIENTID,
    clientSecret: process.env.GCLIENTSECRET,
    scope: ["profile"]
  }, (accessToken, refreshToken, profile, done) => {
    console.log("passport callback function fired");
    console.log(profile);
    User.findOne({
      googleId: profile.id,
    })
    .then((currentUser) => {
      if(currentUser) {
        console.log("user is: ", currentUser);
        done(null, currentUser);
      } else {
        User.create({
          username: profile.displayName,
          googleId: profile.id
        }).save()
        .then((newUser) => {
          console.log("newUser created" + newUser);
          done(null, newUser);
        });
      }
    });
  })
)
passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));