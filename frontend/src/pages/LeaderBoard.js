import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios
      .get("https://YOUR-BACKEND-URL/leaderboard")
      .then((res) => setTeams(res.data));
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      {teams.map((t) => (
        <div key={t._id}>
          <h2>{t.name}</h2>
          <p>Purse: {t.purse}</p>
          <p>Players: {t.players.length}</p>
        </div>
      ))}
    </div>
  );
}
