
 const getMonthlyExpenses = (transactions) => {
  const monthlyTotals = {};

  transactions.forEach(t => {
    const monthIndex = new Date(t.date).getMonth(); // 0–11
    const monthName = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][monthIndex];

    if (!monthlyTotals[monthName]) {
      monthlyTotals[monthName] = 0;
    }
    monthlyTotals[monthName] += t.amount;
  });

  return Object.entries(monthlyTotals).map(([month, expense]) => ({
    month,
    expense,
  }))
};
export default getMonthlyExpenses;

 export const getCategoryTotals = (transactions) => {
  const totals = {};

  transactions.forEach(t => {
    const category = t.category;

    if (!totals[category]) totals[category] = 0;

    totals[category] += t.amount;
  });

  return Object.entries(totals).map(([category, value]) => ({
    category,
    value,
  }));
};
