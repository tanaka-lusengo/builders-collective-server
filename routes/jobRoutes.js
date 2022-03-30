const router = require("express").Router();
const jobControllers = require("../controllers/jobControllers");

// api route to push straight to mongoDB
// jobControllers.getQSJobs();
// jobControllers.getCMJobs();
// jobControllers.getCAJobs();
// jobControllers.getElecJobs();
// jobControllers.getPlumberJobs();
// jobControllers.getAirconJobs();
// jobControllers.getBricklayerJobs();
// jobControllers.getCarpenterJobs();
// jobControllers.getPlastererJobs();

// front-end job routes
router.get("/jobs", jobControllers.getJobs);
router.get("/jobs/title/:jobTitle", jobControllers.getJobsByTitle);
router.get("/jobs/location/:locationName", jobControllers.getJobsByLocation);
router.get(
  "/jobs/:jobTitle/:locationName",
  jobControllers.getJobsByTitleAndLocation
);

module.exports = router;
