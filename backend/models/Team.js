const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: String,
  purse: { type: Number, default: 1000 },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  overseasCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Team", TeamSchema);
