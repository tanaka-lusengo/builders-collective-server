const express = require("express");
const axios = require("axios");
const app = express();

// const PORT = process.env.PORT;
const PORT = 2020 || 4040;

// REED api key
const Reed_API_KEY = "1cf1add8-48e0-483c-ab80-541946ba2d7f";

// REED api endpoint
const REED_API_URL = "https://www.reed.co.uk/api/1.0/search?";

// get by Jobtitle
const REED_API_GET_BY_JT = (jobTitle) => `${REED_API_URL}keywords=${jobTitle}`;

// get by Jobtitle and Location
const REED_API_GET_BY_JT_LO = (jobTitle, location) =>
  `${REED_API_URL}keywords=${jobTitle}&location=${location}`;

// get quantity surveyor Jobs
const getQSJobs = async () => {
  try {
    const qsJobs = await axios.get(REED_API_GET_BY_JT("quantity surveyor"), {
      auth: {
        username: Reed_API_KEY,
      },
    });
    return qsJobs.data.results;
  } catch (err) {
    console.log("get Quantity Surveyor Jobs error -->", err);
  }
};

// get construction manager jobs
const getCMJobs = async () => {
  try {
    const cmJobs = await axios.get(REED_API_GET_BY_JT("construction manager"), {
      auth: {
        username: Reed_API_KEY,
      },
    });

    return cmJobs.data.results;
  } catch (err) {
    console.log("get Construction Manager Jobs error -->", err);
  }
};

// get construction architect/Designer jobs
const getCAJobs = async () => {
  try {
    const caJobs = await axios.get(
      REED_API_GET_BY_JT("construction architect"),
      {
        auth: {
          username: Reed_API_KEY,
        },
      }
    );

    return caJobs.data.results;
  } catch (err) {
    console.log("get Architecture Jobs error -->", err);
  }
};

// get electrician jobs
const getElecJobs = async () => {
  try {
    const elecJobs = await axios.get(REED_API_GET_BY_JT("electrician"), {
      auth: {
        username: Reed_API_KEY,
      },
    });

    return elecJobs.data.results;
  } catch (err) {
    console.log("get Electrician Jobs error -->", err);
  }
};

// plumbing & Heating engineer jobs
const getPlumberJobs = async () => {
  try {
    const plumberJobs = await axios.get(
      REED_API_GET_BY_JT("plumbing heating engineer"),
      {
        auth: {
          username: Reed_API_KEY,
        },
      }
    );

    return plumberJobs.data.results;
  } catch (err) {
    console.log("get Plumber Jobs error -->", err);
  }
};

// air conditioning engineer jobs
const getAirconJobs = async () => {
  try {
    const airconJobs = await axios.get(
      REED_API_GET_BY_JT("air conditioning engineer"),
      {
        auth: {
          username: Reed_API_KEY,
        },
      }
    );

    return airconJobs.data.results;
  } catch (err) {
    console.log("get Aircon Jobs error -->", err);
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

    return bricklayerJobs.data.results;
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

    return carpenterJobs.data.results;
  } catch (err) {
    console.log("get Carpenter Jobs error -->", err);
  }
};

// plasterer jobs
const getPlastererJobs = async () => {
  try {
    const plastererJobs = await axios.get(REED_API_GET_BY_JT("plasterer"), {
      auth: {
        username: Reed_API_KEY,
      },
    });

    return plastererJobs.data.results;
  } catch (err) {
    console.log("get Plasterer Jobs error -->", err);
  }
};

getPlastererJobs();

// middleware
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Test API Server listening on http://localhost:${PORT}`);
});
