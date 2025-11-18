// insights/CalculatePredictions.ts
export function calculatePredictions(transactions) {
  if (!transactions || transactions.length === 0) {
    return { nextMonthPrediction: 0, trend: "neutral" };
  }

  const monthly = {};

  transactions.forEach(t => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    if (!monthly[key]) monthly[key] = 0;
    monthly[key] += t.amount;
  });

  const values = Object.values(monthly);
  if (values.length < 2) {
    return { nextMonthPrediction: values[0], trend: "neutral" };
  }

  const n = values.length;
  const x = [...Array(n).keys()];
  const y = values;

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, v, i) => sum + v * y[i], 0);
  const sumX2 = x.reduce((sum, v) => sum + v * v, 0);

  const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
  const b = (sumY - m * sumX) / n;

  return {
    nextMonthPrediction: Math.round(m * n + b),
    trend: m > 0 ? "increasing" : m < 0 ? "decreasing" : "neutral",
  };
}
