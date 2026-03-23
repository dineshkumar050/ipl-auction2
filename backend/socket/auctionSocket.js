const Player = require("../models/Player");
const Team = require("../models/Team");

let currentPlayer = null;
let timer = 0;
let interval;

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", async ({ teamName }) => {
      socket.teamName = teamName;

      let team = await Team.findOne({ name: teamName });
      if (!team) {
        team = await Team.create({
      name: teamName,
      purse: 1000,
      players: [],
      overseasCount: 0
    });
      }

      team = await Team.findOne({ name: teamName }).populate("players");
      
      socket.emit("team:data", team);
    });

    socket.on("skipAuction", async () => {
  if (!currentPlayer) return;

  clearInterval(interval);

  const skippedPlayer = currentPlayer;

  currentPlayer = null;
  timer = 0;

  io.emit("auction:skipped", skippedPlayer);
  io.emit("timer:update", 0);
});

    socket.on("startAuction", async (playerId) => {
      currentPlayer = await Player.findById(playerId);
      currentPlayer.currentBid = currentPlayer.basePrice;

      timer = 30;
      io.emit("auction:start", currentPlayer);

      clearInterval(interval);
      interval = setInterval(async () => {
        timer--;
        io.emit("timer:update", timer);

        if (timer <= 0) {
          clearInterval(interval);

          if (currentPlayer.soldTo) {
            const team = await Team.findOne({ name: currentPlayer.soldTo });

            team.purse -= currentPlayer.currentBid;
            team.players.push(currentPlayer._id);

            if (currentPlayer.country !== "India") {
              team.overseasCount += 1;
            }

            await team.save();

            team = await Team.findOne({ name: currentPlayer.soldTo }).populate("players");

            io.emit("team:update", team);
          }

          io.emit("auction:end", currentPlayer);
          currentPlayer = null;
          timer = 0;
        }
      }, 1000);
    });

    socket.on("bid", async ({ amount }) => {
      const team = await Team.findOne({ name: socket.teamName });

      if (!currentPlayer || !team) return;

      if (team.purse < amount) {
        socket.emit("error", "Not enough purse");
        return;
      }

      if (amount > currentPlayer.currentBid) {
        currentPlayer.currentBid = amount;
        currentPlayer.soldTo = socket.teamName;

        await currentPlayer.save();

        if(timer <=20) {
          timer = 20;
        }
        io.emit("bid:update", currentPlayer);
      }
    });
  });
};
