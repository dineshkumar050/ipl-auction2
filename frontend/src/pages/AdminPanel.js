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
    <div className="container">
  <h1 style={{ color: "gold" }}>🎮 Admin Control</h1>

  <div style={{ marginBottom: "20px" }}>
        <button onClick={() => socket.emit("skipAuction")}>
          Skip Current Player
        </button>
      </div>

  {players.map(p => (
    <div className="card" key={p._id}>
      <h3>{p.name}</h3>
      <button onClick={() =>
        socket.emit("startAuction", p._id)
      }>
        Start Auction
      </button>
    </div>
  ))}
</div>
  );
}
