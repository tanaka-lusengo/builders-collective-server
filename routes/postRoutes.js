const router = require("express").Router();
const postControllers = require("../controllers/postControllers");

router.post("/post", postControllers.createNewPost);
router.put("/post/:id", postControllers.updatePost);

module.exports = router;
