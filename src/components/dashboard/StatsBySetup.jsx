function StatsBySetup({ data }) {
  if (!data || data.length === 0) {
    return <p>No setup stats yet</p>;
  }

  return (
    <div className="chart-card">
      <h3>Stats by Setup</h3>

      <table className="trade-table">
        <thead>
          <tr>
            <th>Setup</th>
            <th>Trades</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Win Rate (%)</th>
            <th>Total PnL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.setup}>
              <td>{row.setup}</td>
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

export default StatsBySetup;