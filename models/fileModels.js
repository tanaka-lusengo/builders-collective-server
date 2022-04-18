const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    // cb(null, req.body.name); cannot access dile body data...
  },
});

const upload = multer({ storage });

module.exports = { upload };
