function TradeTable({ trades }) {
  if (!trades || trades.length === 0) {
    return <p>No trades yet</p>;
  }

  return (
    <div className="trade-table-wrapper">
      <table className="trade-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Ticker</th>
            <th>Entry</th>
            <th>Exit</th>
            <th>Shares</th>
            <th>PnL</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr key={index}>
              <td>{trade.date}</td>
              <td>{trade.ticker}</td>
              <td>{trade.entry_price}</td>
              <td>{trade.exit_price}</td>
              <td>{trade.shares}</td>
              <td>{trade.pnl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TradeTable;