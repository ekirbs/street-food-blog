const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const dotenv = require("dotenv");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  console.log("***serializedUser: ", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("***deserializedUser: ", id);

  User.findByPk(id).then((user) => {
    done(null, user);
  })
});

passport.use(
  new GoogleStrategy({
    callbackURL: "/auth/google/redirect",
    clientID: process.nextTick.GCLIENTID,
    clientSecret: process.env.GCLIENTSECRET,
    scope: ["profile"]
  }, (accessToken, refreshToken, profile, done) => {
    console.log("***passport callback");

    User.findOne({
      where: {
        googleId: profile.id
      }
    })
    .then((currentUser) => {
      if (currentUser) {
        console.log("***user is: ", currentUser);
        done(null, currentUser);
      } else {
        User.create({
          username: profile.displayName,
          googleId: profile.id
        })
        .then((newUser) => {
          console.log("---new user created: ", newUser);
          done(null, newUser);
        });
      }
    });
  })
)