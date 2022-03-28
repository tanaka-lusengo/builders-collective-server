const axios = require("axios");

// REED api key
const Reed_API_KEY = "1cf1add8-48e0-483c-ab80-541946ba2d7f";

// REED api endpoint
const REED_API_URL = "https://www.reed.co.uk/api/1.0/search?";

// get by Jobtitle
const REED_API_GET_BY_JT = (jobTitle) => `${REED_API_URL}keywords=${jobTitle}`;

// get by Jobtitle and Location
const REED_API_GET_BY_JT_LO = (jobTitle, location) =>
  `${REED_API_URL}keywords=${jobTitle}&location=${location}`;
