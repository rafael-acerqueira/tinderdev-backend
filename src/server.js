require("dotenv/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
  }@cluster0-vbayd.mongodb.net/omnistack?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, (req, res) => {
  console.log("BACKEND is RUNNING");
});
