import React, { useState } from "react";
import JoinRoom from "./pages/JoinRoom";
import AuctionRoom from "./pages/AuctionRoom";

// Simple admin access via URL
  if (window.location.pathname === "/admin") {
    return <AdminPanel />;
  }

function App() {
  const [team, setTeam] = useState(null);

  return team ? <AuctionRoom team={team} /> : <JoinRoom setTeam={setTeam} />;
}

export default App;
