function InsightsPanel({ insights }) {
  if (!insights || insights.length === 0) {
    return <p>No insights yet</p>;
  }

  return (
    <div style={{ marginTop: "24px" }}>
      <h3>Plain-English Insights</h3>

      <ul>
        {insights.map((insight, index) => (
          <li key={index}>{insight}</li>
        ))}
      </ul>
    </div>
  );
}

export default InsightsPanel;