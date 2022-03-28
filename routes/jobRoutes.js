const router = require("express").Router();
const jobControllers = require("../controllers/jobControllers");

router.get("/jobs-all", jobControllers.getJobs);
router.get("/job/:jobTitle", jobControllers.getJobsByTitle);
router.get(
  "/job/:jobTitle/:location",
  jobControllers.getJobsByTitleAndLocation
);

module.exports = router;
