require("dotenv/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectedDevs = {};

io.on("connection", socket => {
  const { user } = socket.handshake.query;
  connectedDevs[user] = socket.id;
});

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
  }@cluster0-vbayd.mongodb.net/omnistack?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

app.use((req, res, next) => {
  req.io = io;
  req.connectedDevs = connectedDevs;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333, (req, res) => {
  console.log("BACKEND is RUNNING");
});
