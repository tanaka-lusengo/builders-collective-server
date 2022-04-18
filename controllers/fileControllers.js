const fileModel = require("../models/fileModels");

// upload new file
const uploadNewFile = async (req, res) => {
  try {
    return res.status(200).json("File has been uploaded successfully");
  } catch (err) {
    console.log("uploadNewFile error -->", err);
  }
};

module.exports = {
  uploadNewFile,
};
