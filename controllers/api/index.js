const router = require("express").Router();

const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");
const streetfood = require("./streetfood");
const weather = require("./weather");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use('/streetfood', streetfood);
router.use('/weather', weather);

module.exports = router;
