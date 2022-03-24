require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// const PORT = process.env.PORT || 4040;
const PORT = 8080 || 4040;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Builders' Collective Server!");
});

app.listen(PORT, () => {
  console.log(
    `Builders' Collective Server listening on http://localhost:${PORT}`
  );
});
