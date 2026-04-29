import { useState } from "react";
import DashboardPage from "../features/dashboard/DashboardPage";
import CSVUploader from "../components/trades/CSVUploader";
import TradeTable from "../components/trades/TradeTable";

function App() {
  const [trades, setTrades] = useState([]);

  return (
      <div className="app">
        <header className="app-header">
          <h1>Trading Journal V1</h1>
          <CSVUploader onDataUpload={setTrades} />
        </header>

        <TradeTable trades={trades} />

        <DashboardPage trades={trades} />
      </div>
  );
}

export default App;
