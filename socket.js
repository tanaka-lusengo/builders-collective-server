// initial library installation set up
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");

// messaging feature
//--------------------------------------------------
const server = http.createServer(app);

const PORT = 3001 || 3002;

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.get("/", (_req, res) => {
  res.send("Welcome to the Builders' Collective Socket Server!");
});

server.listen(PORT, () => {
  console.log(
    `Builders' Collective Network Chat listening on http://localhost:${PORT}`
  );
});
