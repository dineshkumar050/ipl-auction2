const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: String,
  role: String,
  country: String,
  basePrice: Number,
  currentBid: { type: Number, default: 0 },
  soldTo: String,
  image: String,
});

module.exports = mongoose.model("Player", PlayerSchema);
