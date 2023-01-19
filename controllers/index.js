const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const profileRoutes = require("./profileRoutes");
const authRoutes = require("./authRoutes");
const apiRoutes = require("./api");

router.use("/", homeRoutes);
router.use("/profile", profileRoutes);
router.use("/auth", authRoutes);
router.use("/api", apiRoutes);

module.exports = router;
