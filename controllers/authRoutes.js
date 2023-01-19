const router = require("express").Router();
const passport = require("passport");
const withPassportAuth = require("../utils/passportAuth");

router.get("/", withPassportAuth, async(req, res) => {
  res.render("profile", { user: req.user })
});

// auth login
router.get("/login", (req, res) => {
  res.render("login");
});

//auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  req.logout();
  res.redirect("/");
})

// auth with google
router.get("/google", passport.authenticate("google", {
  scope: ["profile"]
}));

// callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  req.user
  res.redirect("/profile/");
});

module.exports = router;