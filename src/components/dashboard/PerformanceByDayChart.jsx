import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

function PerformanceByDayChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No performance by day data yet</p>;
  }

  return (
    <div style={{ width: "100%", height: 300, marginTop: "24px" }}>
      <h3>Performance by Day</h3>

      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="pnl">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.pnl >= 0 ? "#4ade80" : "#f87171"}
            />
          ))}
        </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceByDayChart;