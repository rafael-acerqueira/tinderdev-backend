const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  async create(req, res) {
    const { username } = req.body;

    const userExists = await Dev.findOne({ user: username });
    if (userExists) {
      return res.json(userExists);
    }
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const { name, bio, avatar_url: avatar } = data;

    const dev = await Dev.create({ name, user: username, bio, avatar });

    return res.json(dev);
  }
};
