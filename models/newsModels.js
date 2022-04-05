const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    newsId: {
      type: String,
    },
    title: {
      type: String,
    },
    link: {
      type: String,
    },
    published: {
      type: String,
    },
    source: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", postSchema);
