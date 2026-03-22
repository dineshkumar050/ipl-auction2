import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

export default function AdminPanel() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get("https://YOUR-BACKEND-URL/players")
      .then((res) => setPlayers(res.data));
  }, []);

  return (
    <div>
      <h1>Admin</h1>
      {players.map((p) => (
        <div key={p._id}>
          {p.name}
          <button onClick={() => socket.emit("startAuction", p._id)}>
            Start
          </button>
        </div>
      ))}
    </div>
  );
}
