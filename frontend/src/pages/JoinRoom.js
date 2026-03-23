import React, { useState } from "react";
import socket from "../socket";

export default function JoinRoom({ setTeam }) {
  const [name, setName] = useState("");

  const join = () => {
    socket.emit("join", { teamName: name });
    setTeam(name);
  };

  return (
    <div className="container join-page">
      <div className="card join-card">
        <div className="join-badge">🏏 LIVE AUCTION</div>

        <h1 className="join-title">IPL AUCTION LIVE</h1>
        <p className="join-subtitle">
          Enter your team name to join the auction room
        </p>

        <input
          type="text"
          placeholder="Enter Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") join();
          }}
        />

        <button onClick={join}>Enter Auction</button>
      </div>
    </div>
  );
}
