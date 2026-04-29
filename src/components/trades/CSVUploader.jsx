import { useState } from "react";
import Papa from "papaparse";
import { parseTradesFromRows } from "../../lib/csv";

function CSVUploader({ onDataUpload }) {
  const [message, setMessage] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setMessage("");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().replace(/^\uFEFF/, ""),
      complete: (results) => {
        const trades = parseTradesFromRows(results.data);

        if (trades.length === 0) {
          setMessage(
            "No trades were imported. Check that the CSV has either broker order columns like Date/Time, Symbol, Event or journal columns like date, ticker, entry_price, exit_price, shares, pnl."
          );
        } else {
          setMessage(`Imported ${trades.length} trade${trades.length === 1 ? "" : "s"}.`);
        }

        onDataUpload(trades);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        setMessage("The CSV could not be parsed. Please try another export file.");
      },
    });
  };

  return (
    <div>
      <h3>Upload Trades CSV</h3>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {message ? <p>{message}</p> : null}
    </div>
  );
}

export default CSVUploader;
