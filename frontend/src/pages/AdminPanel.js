import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

export default function AdminPanel() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get("https://ipl-auction2-1.onrender.com/players")
      .then((res) => setPlayers(res.data));
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🎮 Admin Control</h1>
        <button className="admin-skip-btn" onClick={() => socket.emit("skipAuction")}>
          Skip Current Player
        </button>
      </div>

      <div className="admin-grid">
        {players.map((p) => (
          <div className="admin-card" key={p._id}>
            <div className="admin-card-top">
              <div>
                <h3>{p.name}</h3>
                <p>{p.role}</p>
                <p>Team: {p.IPLTeam}</p>
                <p>Base Price: {p.basePrice}</p>
              </div>
              {p.image ? <img src={p.image} alt={p.name} className="admin-player-img" /> : null}
            </div>

            <button onClick={() => socket.emit("startAuction", p._id)}>
              Start Auction
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
