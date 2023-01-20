const router = require("express").Router();
const passport = require("passport");
const withPassportAuth = require("../utils/passportAuth");

// // /auth
// router.get("/", withPassportAuth, async(req, res) => {
//   res.render("profile", { user: req.user })
// });

// /auth/login
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

// /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// /auth/google
router.get("/google", passport.authenticate("google", {
  scope: ["profile"]
}));

// callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // req.user
  res.redirect("/profile");
});

// local login
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;