import StatsCards from "../../components/dashboard/StatsCards";
import EquityCurveChart from "../../components/dashboard/EquityCurveChart";
import DrawdownChart from "../../components/dashboard/DrawdownChart";
import PerformanceByDayChart from "../../components/dashboard/PerformanceByDayChart";
import InsightsPanel from "../../components/dashboard/InsightsPanel";
import StatsBySetup from "../../components/dashboard/StatsBySetup";
import StatsByTicker from "../../components/dashboard/StatsByTicker";
import {
  calculateStats,
  buildEquityCurve,
  buildDrawdown,
  buildPerformanceByDay,
  generatePlainEnglishInsights,
  buildStatsBySetup,
  buildStatsByTicker,
} from "../../lib/calculations";

function DashboardPage({ trades }) {
  const stats = calculateStats(trades);
  const equityCurveData = buildEquityCurve(trades);
  const drawdownData = buildDrawdown(trades);
  const performanceByDayData = buildPerformanceByDay(trades);
  const insights = generatePlainEnglishInsights(trades);
  const setupStatsData = buildStatsBySetup(trades);
  const tickerStatsData = buildStatsByTicker(trades);

return (
  <div className="dashboard">
    <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

    {/* Stats */}
    <section className="dashboard-section">
      <StatsCards stats={stats} />
    </section>

    <section className="dashboard-section">
      <StatsBySetup data={setupStatsData} />
    </section>  

    <section className="dashboard-section">
      <StatsByTicker data={tickerStatsData} />
    </section>

    {/* Charts */}
    <section className="dashboard-section">
      <EquityCurveChart data={equityCurveData} />
    </section>

    <section className="dashboard-section">
      <DrawdownChart data={drawdownData} />
    </section>

    <section className="dashboard-section">
      <PerformanceByDayChart data={performanceByDayData} />
    </section>

    {/* Insights */}
    <section className="dashboard-section">
      <InsightsPanel insights={insights} />
    </section>
  </div>
);
}

export default DashboardPage;