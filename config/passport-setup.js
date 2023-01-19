const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
// const dotenv = require("dotenv");
require('dotenv').config();
// const keys = require("./keys");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })
});

passport.use(
  new GoogleStrategy({
    // options for the google strat
    callbackURL: "/auth/google/redirect",
    // clientID: keys.google.clientID,
    clientID: process.env.GCLIENTID,
    // clientSecret: keys.google.clientSecret
    clientSecret: process.env.GCLIENTSECRET,
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log("passport callback function fired");
    console.log(profile);
    // check if user already exists in database
    User.findOne({
      googleId: profile.id,
    })
    .then((currentUser) => {
      if(currentUser) {
        // already have the user
        console.log("user is: ", currentUser);
        done(null, currentUser);
      } else {
        // if not, create user in db
        new User({
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








// passport.serializeUser((user, done) => {
//   console.log("***serializedUser: ", user);
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   console.log("***deserializedUser: ", id);

//   User.findByPk(id).then((user) => {
//     done(null, user);
//   })
// });


//     callbackURL: "/auth/google/redirect",
//     clientID: process.nextTick.GCLIENTID,
//     clientSecret: process.env.GCLIENTSECRET,
//     scope: ["profile"]
//   }, (accessToken, refreshToken, profile, done) => {
//     console.log("***passport callback");

//     User.findOne({
//       where: {
//         googleId: profile.id
//       }
//     })
//     .then((currentUser) => {
//       if (currentUser) {
//         console.log("***user is: ", currentUser);
//         done(null, currentUser);
//       } else {
//         User.create({
//           username: profile.displayName,
//           googleId: profile.id
//         })
//         .then((newUser) => {
//           console.log("***newUser created: ", newUser);
//           done(null, newUser);
//         });
//       }
//     });
//   })
// )