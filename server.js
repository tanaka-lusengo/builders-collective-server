// initial library installation set up
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// const PORT = process.env.PORT;
const PORT = 8080 || 4040;

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("connected to MongoDB");
});

// routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// defined routes
app.use(userRoutes);
app.use(postRoutes);

app.get("/", (_req, res) => {
  res.send("Welcome to the Builders' Collective Server Server!");
});

app.listen(PORT, () => {
  console.log(
    `Builders' Collective Server listening on http://localhost:${PORT}`
  );
});
