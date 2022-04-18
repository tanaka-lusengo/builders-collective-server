const router = require("express").Router();
const fileControllers = require("../controllers/fileControllers");
const fileModels = require("../models/fileModels");

// fileUpload routes
router.post(
  "/upload",
  fileModels.upload.single("file"),
  fileControllers.uploadNewFile
);

module.exports = router;
