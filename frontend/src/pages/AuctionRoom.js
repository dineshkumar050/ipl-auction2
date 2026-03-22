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

  return (
    <div className="container">
      <h2>{team}</h2>
      {teamData && <h3>💰 {teamData.purse}</h3>}

      {player && (
        <div className="card">
          <img src={player.image} width="120" alt="" />
          <h1>{player.name}</h1>
          <p>{player.role}</p>
          <p>💰 {player.currentBid}</p>
          <p>🏆 {player.soldTo}</p>
          <h3>⏳ {timer}</h3>

          <input onChange={(e) => setBid(e.target.value)} />
          <button onClick={() => socket.emit("bid", { amount: Number(bid) })}>
            Bid
          </button>
        </div>
      )}
    </div>
  );
}
