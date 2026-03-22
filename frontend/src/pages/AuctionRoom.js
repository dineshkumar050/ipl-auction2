import React, { useEffect, useMemo, useState } from "react";
import socket from "../socket";
import "./AuctionRoom.css";

export default function AuctionRoom({ team }) {
  const [player, setPlayer] = useState(null);
  const [timer, setTimer] = useState(0);
  const [bid, setBid] = useState("");
  const [teamData, setTeamData] = useState(null);

  const bidSound = useMemo(() => new Audio("/sounds/bid.mp3"), []);
  const soldSound = useMemo(() => new Audio("/sounds/sold.mp3"), []);

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

    return () => {
      socket.off("auction:start", setPlayer);
      socket.off("timer:update", setTimer);
      socket.off("bid:update");
      socket.off("auction:end");
      socket.off("team:data", setTeamData);
    };
  }, [bidSound, soldSound]);

  const placeBid = () => {
    if (!bid || Number(bid) <= 0) return;
    socket.emit("bid", { amount: Number(bid) });
    setBid("");
  };

  return (
    <div className="auction-page">
      <div className="auction-bg" />

      <div className="auction-header">
        <div>
          <p className="auction-label">Live Auction Room</p>
          <h2>🏆 Team: {team}</h2>
        </div>

        {teamData && (
          <div className="team-badge">
            <span>Wallet</span>
            <strong>💰 {teamData.balance ?? "N/A"}</strong>
          </div>
        )}
      </div>

      {player ? (
        <div className="auction-card">
          <div className="player-image-wrap">
            <img src={player.image} alt={player.name} className="player-image" />
            <div className="player-role">{player.role}</div>
          </div>

          <div className="player-content">
            <h1 className="player-name">{player.name}</h1>

            <div className="stats-grid">
              <div className="stat-box">
                <span>Current Bid</span>
                <strong>💰 {player.currentBid}</strong>
              </div>

              <div className="stat-box">
                <span>Leading Team</span>
                <strong>🏏 {player.soldTo || "None"}</strong>
              </div>

              <div className={`stat-box timer-box ${timer <= 5 ? "danger" : ""}`}>
                <span>Time Left</span>
                <strong>⏳ {timer}s</strong>
              </div>
            </div>

            <div className="bid-section">
              <input
                type="number"
                value={bid}
                placeholder="Enter your bid"
                className="bid-input"
                onChange={(e) => setBid(e.target.value)}
              />

              <button className="bid-button" onClick={placeBid}>
                🔥 Place Bid
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="waiting-card">
          <h3>No player in auction right now</h3>
          <p>Waiting for the next round to begin...</p>
        </div>
      )}
    </div>
  );
}
