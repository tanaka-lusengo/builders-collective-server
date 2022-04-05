// const newsModel = require("../models/newsModels");
// const axios = require("axios");

// // Google News api key
// const GOOGLE_NEWS_API_KEY =
//   "6c306d5606msha31401f1b7941f2p1ab337jsn944b12eb6568";

// // Google News api endpoint
// const GOOGLE_NEWS_API_URL = "https://google-news.p.rapidapi.com/v1/search";

// const GET_NEWS = {
//   method: "GET",
//   url: "https://google-news.p.rapidapi.com/v1/search",
//   params: { q: "Construction", country: "UK", lang: "en" },
//   headers: {
//     "X-RapidAPI-Host": "google-news.p.rapidapi.com",
//     "X-RapidAPI-Key": "6c306d5606msha31401f1b7941f2p1ab337jsn944b12eb6568",
//   },
// };

// // helper functions to push api data to MongoDB
// //--------------------------------------------------------

// const onSuccess = async (response) => {
//   // map through api information to gather required info
//   try {
//     await response.slice(0, 6).map((article) => {
//       let newsId = article.id;
//       let title = article.title;
//       let link = article.link;
//       let published = article.published;
//       let source = article.source.title;

//       //create new newsarticle function
//       assignDataValueToMongoDB(newsId, title, link, published, source);
//     });
//   } catch (err) {
//     console.log("onSuccess Google NewsArticles error -->", err);
//   }
// };

// // function to create new article
// const assignDataValueToMongoDB = async (
//   newsId,
//   title,
//   link,
//   published,
//   source
// ) => {
//   try {
//     let uploadData = await new newsModel({
//       newsId: newsId,
//       title: title,
//       link: link,
//       published: published,
//       source: source,
//     });

//     // save new jobs
//     await uploadData.save();
//   } catch (err) {
//     console.log("assignDataValueToMongoDB - Google News error -->", err);
//   }
// };

// // function to push API data to be pushed into MongoDB
// //--------------------------------------------------------

// const getNewsArticles = async () => {
//   try {
//     const response = await axios.request(GET_NEWS);
//     await onSuccess(response.articles);

//     console.log("News Articles --> ", response.articles);
//     console.log(response);
//   } catch (err) {
//     console.log("getNewsArticles error -->", err);
//   }
// };

// module.exports = {
//   getNewsArticles,
// };
