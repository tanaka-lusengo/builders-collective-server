// initial library installation set up
const express = require("express");
const app = express();
const appS = express();
const mongoose = require("mongoose");
const JobModel = require("./models/jobModels");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4040;

// function to delete JobModel collection everytimebefore axios call as to always have the latest jobs displayed
const deleteJobCollection = async (collection) => {
  try {
    await collection.deleteMany({});
  } catch (err) {
    console.log("deleteJobCollection error -->", err);
  }
};

deleteJobCollection(JobModel);

// routes
const jobRoutes = require("./routes/jobRoutes");
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
  console.log(
    `Builders' Collective Server listening on http://localhost:${PORT}`
  );
});

// messaging/My Network feature
//--------------------------------------------------

// establish connection to new instance "server"
const server = http.createServer(appS);

// cors management safe guarding
const io = new Server(server, {
  cors: {
    origin: "https://builders-collective.herokuapp.com/",
    methods: ["GET", "POST"],
  },
});

// listening for event with "connection" id
io.on("connection", (socket) => {
  //welcomes current user
  socket.emit("message", "Welcome to the Builders' Collective Chat Stream");

  // broadcast to other users when a new user connects
  socket.broadcast.emit("message", "A user has joined the chat");

  // upon joining a room
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  // Listen for sendMessage() function for message sent from chat room
  socket.on("send_message", (messageData) => {
    socket.to(messageData.room).emit("receive_message", messageData);
  });

  // lets all users know when a user disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });
});

const SOCKET_PORT = process.env.SOCKET_PORT || 3202;
// const SOCKET_PORT = 3001 || 3202;

appS.get("/", (_req, res) => {
  res.send("Welcome to the Builders' Collective Socket Server!");
});

server.listen(SOCKET_PORT, () => {
  console.log(
    `Builders' Collective Network Chat listening on http://localhost:${SOCKET_PORT}`
  );
});
