import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function EquityCurveChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No equity curve data yet</p>;
  }

  return (
    <div style={{ width: "100%", height: 300, marginTop: "24px" }}>
      <h3>Equity Curve</h3>

      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tradeNumber" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="equity" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EquityCurveChart;