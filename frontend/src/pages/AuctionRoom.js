import React, { useEffect, useState } from "react";
import socket from "../socket";

export default function AuctionRoom({ team }) {
  const [player, setPlayer] = useState(null);
  const [timer, setTimer] = useState(0);
  const [bid, setBid] = useState("");
  const [teamData, setTeamData] = useState(null);

  const bidSound = new Audio("/sounds/bid.mp3");
  const soldSound = new Audio("/sounds/sold.mp3");

  useEffect(() => {
    socket.on("auction:start", setPlayer);
    socket.on("timer:update", setTimer);
    socket.on("bid:update", (p) => {
      bidSound.play();
      setPlayer(p);
    });

    socket.on("auction:end", (p) => {
      soldSound.play();
      alert(`${p.name} sold to ${p.soldTo}`);
    });

    socket.on("team:data", setTeamData);

    return () => socket.off();
  }, []);

  <div className="container">
  <h2 style={{ color: "gold" }}>🏆 Team: {team}</h2>

  {player && (
    <div className="card">
      <img src={player.image} width="120" alt="" />

      <h1>{player.name}</h1>
      <p>{player.role}</p>

      <p>💰 Current Bid: {player.currentBid}</p>
      <p>🏏 Leading: {player.soldTo || "None"}</p>

      <div className="timer">⏳ {timer}s</div>

      <input
        type="number"
        placeholder="Enter bid"
        onChange={(e) => setBid(e.target.value)}
      />

      <button onClick={() =>
        socket.emit("bid", { amount: Number(bid) })
      }>
        🔥 Place Bid
      </button>
    </div>
  )}
</div>
}
