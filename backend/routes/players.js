const express = require("express");
const router = express.Router();
const Player = require("../models/Player");

router.get("/", async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

router.post("/", async (req, res) => {
  const players = await Player.insertMany(req.body);
  res.json(players);
});

module.exports = router;
