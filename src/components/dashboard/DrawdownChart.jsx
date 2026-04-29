import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function DrawdownChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No drawdown data yet</p>;
  }

  return (
    <div style={{ width: "100%", height: 300, marginTop: "24px" }}>
      <h3>Drawdown</h3>

      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tradeNumber" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="drawdown" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DrawdownChart;