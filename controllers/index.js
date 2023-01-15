const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const profileRoutes = require("./profileRoutes")
const apiRoutes = require("./api");

router.use("/", homeRoutes);
router.use("/profile", profileRoutes);
router.use("/api", apiRoutes);

module.exports = router;
