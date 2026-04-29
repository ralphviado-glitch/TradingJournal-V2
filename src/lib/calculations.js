export function calculateStats(trades = []) {
  const totalTrades = trades.length;

  const winsArray = trades.filter((trade) => Number(trade.pnl) > 0);
  const lossesArray = trades.filter((trade) => Number(trade.pnl) < 0);

  const wins = winsArray.length;
  const losses = lossesArray.length;

  const totalPnl = trades.reduce((sum, trade) => {
    return sum + Number(trade.pnl || 0);
  }, 0);

  const winRate =
    totalTrades === 0 ? 0 : Number(((wins / totalTrades) * 100).toFixed(1));

  const averageWinner =
    wins === 0
      ? 0
      : Number(
          (
            winsArray.reduce((sum, trade) => sum + Number(trade.pnl || 0), 0) /
            wins
          ).toFixed(2)
        );

  const averageLoser =
    losses === 0
      ? 0
      : Number(
          (
            lossesArray.reduce(
              (sum, trade) => sum + Number(trade.pnl || 0),
              0
            ) / losses
          ).toFixed(2)
        );

    const payoffRatio =
      averageLoser === 0
        ? "N/A"
        : Number((averageWinner / Math.abs(averageLoser)).toFixed(2));

      const pnlByStock = trades.reduce((acc, trade) => {
        const ticker = trade.ticker || "Unknown";
        const pnl = Number(trade.pnl || 0);

        acc[ticker] = (acc[ticker] || 0) + pnl;

        return acc;
      }, {});

  const stockEntries = Object.entries(pnlByStock);

  const bestStock =
    stockEntries.length === 0
      ? "N/A"
      : stockEntries.reduce((best, current) =>
          current[1] > best[1] ? current : best
        )[0];

  const worstStock =
    stockEntries.length === 0
      ? "N/A"
      : stockEntries.reduce((worst, current) =>
          current[1] < worst[1] ? current : worst
        )[0];

  let currentWinStreak = 0;
  let currentLossStreak = 0;
  let longestWinningStreak = 0;
  let longestLosingStreak = 0;

  trades.forEach((trade) => {
    const pnl = Number(trade.pnl || 0);

    if (pnl > 0) {
      currentWinStreak += 1;
      currentLossStreak = 0;
      longestWinningStreak = Math.max(longestWinningStreak, currentWinStreak);
    } else if (pnl < 0) {
      currentLossStreak += 1;
      currentWinStreak = 0;
      longestLosingStreak = Math.max(longestLosingStreak, currentLossStreak);
    } else {
      currentWinStreak = 0;
      currentLossStreak = 0;
    }
  });

  return {
    totalTrades,
    wins,
    losses,
    winRate,
    totalPnl,
    payoffRatio,
    averageWinner,
    averageLoser,
    bestStock,
    worstStock,
    longestWinningStreak,
    longestLosingStreak,
  };
}

export function buildEquityCurve(trades = []) {
  let runningPnl = 0;

  return trades.map((trade, index) => {
    runningPnl += Number(trade.pnl || 0);

    return {
      tradeNumber: index + 1,
      date: trade.date,
      equity: runningPnl,
    };
  });
}

export function buildDrawdown(trades = []) {
  let runningPnl = 0;
  let peak = 0;

  return trades.map((trade, index) => {
    runningPnl += Number(trade.pnl || 0);
    peak = Math.max(peak, runningPnl);

    return {
      tradeNumber: index + 1,
      date: trade.date,
      drawdown: runningPnl - peak,
    };
  });
}

export function buildPerformanceByDay(trades = []) {
  const pnlByDay = {};

  trades.forEach((trade) => {
    const date = new Date(trade.date);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const pnl = Number(trade.pnl || 0);

    pnlByDay[day] = (pnlByDay[day] || 0) + pnl;
  });

  return Object.entries(pnlByDay).map(([day, pnl]) => ({
    day,
    pnl,
  }));
}

export function getBestPerformingSetup(trades = []) {
  const setupPerformance = {};

  trades.forEach((trade) => {
    const setup = trade.setup || "Unknown";
    const pnl = Number(trade.pnl || 0);

    setupPerformance[setup] = (setupPerformance[setup] || 0) + pnl;
  });

  const entries = Object.entries(setupPerformance);

  if (entries.length === 0) {
    return "N/A";
  }

  const bestSetup = entries.reduce((best, current) =>
    current[1] > best[1] ? current : best
  );

  return `${bestSetup[0]} ($${bestSetup[1]})`;
}

export function getWorstPerformingSetup(trades = []) {
  const setupPerformance = {};

  trades.forEach((trade) => {
    const setup = trade.setup || "Unknown";
    const pnl = Number(trade.pnl || 0);

    setupPerformance[setup] = (setupPerformance[setup] || 0) + pnl;
  });

  const entries = Object.entries(setupPerformance);

  if (entries.length === 0) {
    return "N/A";
  }

  const worstSetup = entries.reduce((worst, current) =>
    current[1] < worst[1] ? current : worst
  );

  return `${worstSetup[0]} ($${worstSetup[1]})`;
}

export function getBestTradingDay(trades = []) {
  const dayPerformance = {};

  trades.forEach((trade) => {
    const date = new Date(trade.date);
    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    const pnl = Number(trade.pnl || 0);

    dayPerformance[day] = (dayPerformance[day] || 0) + pnl;
  });

  const entries = Object.entries(dayPerformance);

  if (entries.length === 0) {
    return "N/A";
  }

  const bestDay = entries.reduce((best, current) =>
    current[1] > best[1] ? current : best
  );

  return `${bestDay[0]} ($${bestDay[1]})`;
}

export function getBestTimeOfDay(trades = []) {
  const timePerformance = {};

  trades.forEach((trade) => {
    const time = trade.entry_time || "Unknown";
    const pnl = Number(trade.pnl || 0);

    timePerformance[time] = (timePerformance[time] || 0) + pnl;
  });

  const entries = Object.entries(timePerformance);

  if (entries.length === 0) {
    return "N/A";
  }

  const bestTime = entries.reduce((best, current) =>
    current[1] > best[1] ? current : best
  );

  return `${bestTime[0]} ($${bestTime[1]})`;
}

export function generatePlainEnglishInsights(trades = []) {
  if (!trades || trades.length === 0) {
    return ["Upload trades to generate insights."];
  }

  const stats = calculateStats(trades);
  const insights = [];

  insights.push(
    `You took ${stats.totalTrades} trades with a ${stats.winRate}% win rate.`
  );

  insights.push(
    `Your total PnL is $${stats.totalPnl}. Your average winner is $${stats.averageWinner}, while your average loser is $${stats.averageLoser}.`
  );

  if (stats.averageWinner > Math.abs(stats.averageLoser)) {
    insights.push("Your winners are larger than your losers. This is a good sign.");
  } else {
    insights.push("Your losers are larger than your winners. You may need tighter risk control.");
  }

  insights.push(`Your best stock is ${stats.bestStock}.`);
  insights.push(`Your worst stock is ${stats.worstStock}.`);

  return insights;
}