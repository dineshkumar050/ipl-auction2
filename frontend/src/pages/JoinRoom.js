import React, { useState } from "react";
import socket from "../socket";

export default function JoinRoom({ setTeam }) {
  const [name, setName] = useState("");

  const join = () => {
    socket.emit("join", { teamName: name });
    setTeam(name);
  };

  return (
    <div className="center">
      <h1 style={{ fontSize: "40px", color: "gold" }}>
        🏏 IPL AUCTION LIVE
      </h1>

      <input
        placeholder="Enter Team Name"
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={join}>Enter Auction</button>
    </div>
  );
}
