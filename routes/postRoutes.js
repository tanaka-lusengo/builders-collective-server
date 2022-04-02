const router = require("express").Router();
const postControllers = require("../controllers/postControllers");

router.post("/post", postControllers.createNewPost);
router.put("/post/:id", postControllers.updatePost);
router.delete("/post/:id", postControllers.deletePost);
router.get("/post/:id", postControllers.getPost);
router.get("/posts/all", postControllers.getAllPosts);
router.put("/post/:id/like", postControllers.likePost);
router.get("/post/timeline/:userId", postControllers.getTimeline);

module.exports = router;
