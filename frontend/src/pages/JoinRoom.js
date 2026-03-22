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
      <h1>🏏 IPL Auction</h1>
      <input onChange={(e) => setName(e.target.value)} />
      <button onClick={join}>Join</button>
    </div>
  );
}
