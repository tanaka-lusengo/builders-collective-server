const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // front-end first page
    firstName: {
      type: String,
      required: true,
      min: 1,
      max: 30,
    },
    lastName: {
      type: String,
      required: true,
      min: 1,
      max: 30,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      min: 1,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 1,
      max: 20,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      min: 1,
      min: 8,
    },
    // front-end second page
    jobTitle: {
      type: String,
      required: true,
      min: 1,
      max: 30,
    },
    experienceLevel: {
      type: String,
      required: true,
      min: 1,
      max: 20,
    },
    location: {
      type: String,
      required: true,
      min: 1,
      max: 20,
    },
    // default items, not required to register profile
    about: {
      type: String,
      default: "",
    },
    skills: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
