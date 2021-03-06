const router = require("express").Router();
const jobControllers = require("../controllers/jobControllers");

// api route to push straight to mongoDB
jobControllers.getQSJobs();
jobControllers.getBricklayerJobs();
jobControllers.getCarpenterJobs();

// front-end job routes
router.get("/jobs", jobControllers.getJobs);
router.get("/jobs/title/:jobTitle", jobControllers.getJobsByTitle);
router.get("/jobs/location/:locationName", jobControllers.getJobsByLocation);
router.get(
  "/jobs/:jobTitle/:locationName",
  jobControllers.getJobsByTitleAndLocation
);

module.exports = router;
