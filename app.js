// initial library installation set up
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const JobModel = require("./models/jobModels");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8080;

// function to delete JobModel collection everytimebefore axios call as to always have the latest jobs displayed
const deleteJobCollection = async (collection) => {
  try {
    await collection.deleteMany({});
  } catch (err) {
    console.log("deleteJobCollection error -->", err);
  }
};

deleteJobCollection(JobModel);

// upload images path - don't make request, go to "public/images" directory
app.use("/images", express.static(path.join(__dirname, "public/images")));

// routes
const fileRoutes = require("./routes/fileRoutes");
const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// defined routes
app.use(fileRoutes);
app.use(userRoutes);
app.use(postRoutes);
app.use(jobRoutes);

// connection to MongoDB
mongoose.connect(process.env.MONGO_URL, function (err) {
  if (err) throw err;
  console.log("connected to MongoDB");
});

app.get("/", (_req, res) => {
  res.send("Welcome to the Builders' Collective Server!");
});

app.listen(PORT, () => {
  console.log(`Builders' Collective Server listening on Port: ${PORT}`);
});
