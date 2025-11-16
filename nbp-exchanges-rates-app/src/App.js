import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExchangeRatesTable from "./components/exchangeRatesTable";
import ManualSync from "./components/manualSync";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTableCode, setSelectedTableCode] = useState("A");

  const fetchTables = () => {
  setLoading(true);
  axios.get("https://localhost:7276/api/exchangerates/tables")
    .then(res => {
      setTables(res.data);
      
      if (!res.data.find(t => t.tableCode === selectedTableCode)) {
        setSelectedTableCode(res.data.length > 0 ? res.data[0].tableCode : "");
      }
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError("Error fetching data");
      setLoading(false);
    });
};

  useEffect(() => {
    fetchTables();
  }, []);

  const filteredTable = tables.find(t => t.tableCode === selectedTableCode);

  return (
    <Router>
      <nav style={{ padding: "1rem", backgroundColor: "#4CAF50" }}>
        <Link to="/" style={{ marginRight: "1rem", color: "white" }}>Home</Link>
        <Link to="/manual-sync" style={{ color: "white" }}>Manual Sync</Link>
      </nav>

      <Routes>
        <Route path="/" element={
          <div style={{ padding: "2rem" }}>
            <h1>NBP Exchange Rates</h1>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : tables.length > 0 ? (
              <>
                <label htmlFor="table-select">Select Table: </label>
                <select
                  id="table-select"
                  value={selectedTableCode}
                  onChange={(e) => setSelectedTableCode(e.target.value)}
                  style={{ marginBottom: "1rem", padding: "0.3rem 0.5rem" }}
                >
                  {tables.map(table => (
                    <option key={table.id} value={table.tableCode}>
                      {table.tableCode}
                    </option>
                  ))}
                </select>

                <ExchangeRatesTable
                  table={filteredTable}
                />
              </>
            ) : (
              <p>No data available.</p>
            )}
          </div>
        } />

        <Route path="/manual-sync" element={
          <ManualSync onActionComplete={fetchTables} />
        } />
      </Routes>
    </Router>
  );
}

export default App;