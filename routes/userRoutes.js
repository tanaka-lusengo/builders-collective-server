const router = require("express").Router();
const userControllers = require("../controllers/userControllers");

// user routes
router.post("/register", userControllers.registerNewUser);
router.post("/login", userControllers.loginUser);
router.put("/user/:id", userControllers.updateUser);
router.delete("/user/:id", userControllers.deleteUser);
router.get("/user", userControllers.getUserById);
router.put("/user/:id/follow", userControllers.followUser);
router.delete("/user/:id/unfollow", userControllers.unFollowUser);

module.exports = router;
