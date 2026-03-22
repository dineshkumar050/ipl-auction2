require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

const Player = require("./models/Player");
const Team = require("./models/Team");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

require("./socket/auctionSocket")(io);

// API routes
app.use("/players", require("./routes/players"));

// leaderboard
app.get("/leaderboard", async (req, res) => {
  const teams = await Team.find().populate("players");
  res.json(teams);
});

server.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`),
);
