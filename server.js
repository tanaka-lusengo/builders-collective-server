// initial library installation set up
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// const PORT = process.env.PORT;
const PORT = 8080 || 4040;

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// defined routes
app.use(userRoutes);
app.use(postRoutes);

// connection to MongoDB
mongoose.connect(process.env.MONGO_URL, function (err) {
  if (err) throw err;
  console.log("connected to MongoDB");
});

app.get("/", (_req, res) => {
  res.send("Welcome to the Builders' Collective Server Server!");
});

app.listen(PORT, () => {
  console.log(
    `Builders' Collective Server listening on http://localhost:${PORT}`
  );
});
