function StatsByTicker({ data }) {
  if (!data || data.length === 0) {
    return <p>No ticker stats yet</p>;
  }

  return (
    <div className="chart-card">
      <h3>Stats by Ticker</h3>

      <table className="trade-table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Trades</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Win Rate (%)</th>
            <th>Total PnL</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.ticker}>
              <td>{row.ticker}</td>
              <td>{row.totalTrades}</td>
              <td>{row.wins}</td>
              <td>{row.losses}</td>
              <td>{row.winRate}</td>
              <td>{row.totalPnl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StatsByTicker;