const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: Number,
    },
    employerId: {
      type: Number,
    },
    employerName: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    locationName: {
      type: String,
    },
    minimumSalary: {
      type: Number,
    },
    maximumSalary: {
      type: Number,
    },
    expirationDate: {
      type: String,
    },
    date: {
      type: String,
    },
    jobDescription: {
      type: String,
    },
    applications: {
      type: Number,
    },
    jobUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
