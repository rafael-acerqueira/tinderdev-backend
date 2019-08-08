const express = require("express");
const DevController = require("./controllers/DevController");
const LikeController = require("./controllers/LikeController");

const routes = express.Router();

routes.post("/devs", DevController.create);
routes.post("/devs/:id/likes", LikeController.create);

module.exports = routes;
