import { useState } from "react";
import axios from "axios";
import "./manualSync.css";

export default function ManualSync({ onActionComplete }) {
  const [message, setMessage] = useState("");

  const handleSync = (table) => {
    axios.post(`https://localhost:7276/api/manualsync/sync?tableToSync=${table}`)
      .then(res => {
        setMessage(res.data.message);
        if (onActionComplete) onActionComplete();
      })
      .catch(err => setMessage("Error syncing table"));
  };

  const handleClear = () => {
    axios.post("https://localhost:7276/api/manualsync/clear")
      .then(res => {
        setMessage(res.data.message);
        if (onActionComplete) onActionComplete();
      })
      .catch(err => setMessage("Error clearing data"));
  };

  return (
    <div className="manual-sync-container">
      <h1>Manual Sync</h1>

      {message && <p>{message}</p>}

      <div>
        <button onClick={() => handleSync("a")}>Sync Table A</button>
        <button onClick={() => handleSync("b")}>Sync Table B</button>
        <button onClick={handleClear}>Clear DB</button>
      </div>
    </div>
  );
}