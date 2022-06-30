const JobModel = require("../models/jobModels");
const axios = require("axios");

// API endpoints
//--------------------------------------------------------

// REED api key
const Reed_API_KEY = process.env.API_KEY;

// REED api endpoint
const REED_API_URL = "https://www.reed.co.uk/api/1.0/search?";

// get by Jobtitle for all general jobs
const REED_API_GET_BY_JT = (jobTitle) => `${REED_API_URL}keywords=${jobTitle}`;

// helper functions to push api data to MongoDB
//--------------------------------------------------------

const onSuccess = async (response) => {
  // map through api information to gather required info
  try {
    await response.map((job) => {
      let jobId = job.jobId;
      let employerId = job.employerId;
      let employerName = job.employerName;
      let jobTitle = job.jobTitle;
      let locationName = job.locationName;
      let minimumSalary = job.minimumSalary;
      let maximumSalary = job.maximumSalary;
      let expirationDate = job.expirationDate;
      let date = job.date;
      let jobDescription = job.jobDescription;
      let applications = job.applications;
      let jobUrl = job.jobUrl;

      //create new job function
      assignDataValueToMongoDB(
        jobId,
        employerId,
        employerName,
        jobTitle,
        locationName,
        minimumSalary,
        maximumSalary,
        expirationDate,
        date,
        jobDescription,
        applications,
        jobUrl
      );
    });
  } catch (err) {
    console.log("onSuccess error -->", err);
  }
};

// function to create new job
const assignDataValueToMongoDB = async (
  jobId,
  employerId,
  employerName,
  jobTitle,
  locationName,
  minimumSalary,
  maximumSalary,
  expirationDate,
  date,
  jobDescription,
  applications,
  jobUrl
) => {
  try {
    let uploadData = await new JobModel({
      jobId: jobId,
      employerId: employerId,
      employerName: employerName,
      jobTitle: jobTitle,
      locationName: locationName,
      minimumSalary: minimumSalary,
      maximumSalary: maximumSalary,
      expirationDate: expirationDate,
      date: date,
      jobDescription: jobDescription,
      applications: applications,
      jobUrl: jobUrl,
    });

    // save new jobs
    await uploadData.save();
  } catch (err) {
    console.log("assignDataValueToMongoDB error -->", err);
  }
};

// function to push API data to be pushed into MongoDB
//--------------------------------------------------------

// get quantity surveyor Jobs
const getQSJobs = async () => {
  try {
    const qsJobs = await axios.get(REED_API_GET_BY_JT("quantity surveyor"), {
      auth: {
        username: Reed_API_KEY,
      },
    });
    const response = qsJobs.data.results;
    await onSuccess(response);
    // console.log("QS Jobs -->", response.length);
  } catch (err) {
    console.log("get Quantity Surveyor Jobs error -->", err);
  }
};

// bricklayer jobs
const getBricklayerJobs = async () => {
  try {
    const bricklayerJobs = await axios.get(REED_API_GET_BY_JT("bricklayer"), {
      auth: {
        username: Reed_API_KEY,
      },
    });

    const response = bricklayerJobs.data.results;
    await onSuccess(response);
    // console.log("Brick Jobs -->", response.length);
  } catch (err) {
    console.log("get Bricklayer Jobs error -->", err);
  }
};

// carpenter/joiner jobs
const getCarpenterJobs = async () => {
  try {
    const carpenterJobs = await axios.get(REED_API_GET_BY_JT("carpenter"), {
      auth: {
        username: Reed_API_KEY,
      },
    });

    const response = carpenterJobs.data.results;
    await onSuccess(response);
    // console.log("Carpenter Jobs -->", response.length);
  } catch (err) {
    console.log("get Carpenter Jobs error -->", err);
  }
};

// REST API for front end
//--------------------------------------------------------

// get all jobs
const getJobs = async (_req, res) => {
  try {
    const post = await JobModel.find({});
    res.status(200).json(post);
  } catch (err) {
    return res.status(500).json("getJobs error -->", err);
  }
};

// get jobs by title
const getJobsByTitle = async (req, res) => {
  const { jobTitle } = req.params;
  // regex expression to search/filter database for similar matching words, not exact - flexible
  const jobTitleRegex = new RegExp(jobTitle);
  try {
    const post = await JobModel.find({
      jobTitle: { $regex: jobTitleRegex, $options: "i" },
    });
    res.status(200).json(post);
  } catch (err) {
    return res.status(500).json("getJobsByTitle error -->", err);
  }
};

// get jobs by locationName
const getJobsByLocation = async (req, res) => {
  const { locationName } = req.params;
  // regex expression to search/filter database for similar matching words, not exact - flexible
  const locationNameRegex = new RegExp(locationName);
  try {
    const post = await JobModel.find({
      locationName: { $regex: locationNameRegex, $options: "i" },
    });
    res.status(200).json(post);
  } catch (err) {
    return res.status(500).json("getJobsByLocationName error -->", err);
  }
};

// get jobs by title and location
const getJobsByTitleAndLocation = async (req, res) => {
  const { jobTitle, locationName } = req.params;
  // regex expression to search/filter database for similar matching words, not exact - flexible
  const jobTitleRegex = new RegExp(jobTitle);
  const locationNameRegex = new RegExp(locationName);
  try {
    const post = await JobModel.find({
      jobTitle: { $regex: jobTitleRegex, $options: "i" },
      locationName: { $regex: locationNameRegex, $options: "i" },
    }).exec();
    res.status(200).json(post);
  } catch (err) {
    return res.status(500).json("getJobsByTitleAndLocation error -->", err);
  }
};

module.exports = {
  getQSJobs,
  getBricklayerJobs,
  getCarpenterJobs,
  getJobs,
  getJobsByTitle,
  getJobsByLocation,
  getJobsByTitleAndLocation,
};
