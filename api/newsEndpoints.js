const axios = require("axios");

// Google News api key
const GOOGLE_NEWS_API_KEY =
  "6c306d5606msha31401f1b7941f2p1ab337jsn944b12eb6568";

// Google News api endpoint
const GOOGLE_NEWS_API_URL = "https://google-news.p.rapidapi.com/v1/search";

// get by Jobtitle
const REED_API_GET_BY_JT = (jobTitle) => `${REED_API_URL}keywords=${jobTitle}`;

// get by Jobtitle and Location
const REED_API_GET_BY_JT_LO = (jobTitle, location) =>
  `${REED_API_URL}keywords=${jobTitle}&location=${location}`;

const GET_NEWS = {
  method: "GET",
  url: GOOGLE_NEWS_API_URL,
  params: { q: "Construction", country: "UK", lang: "en" },
  headers: {
    "X-RapidAPI-Host": "google-news.p.rapidapi.com",
    "X-RapidAPI-Key": GOOGLE_NEWS_API_KEY,
  },
};

// axios.request(GET_NEWS).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });
