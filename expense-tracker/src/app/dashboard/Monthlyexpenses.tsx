import { recentTransactionType } from "../components/(share_types)/AllTypes";
import { Timestamp } from "firebase/firestore";

 const getMonthlyExpenses = (transactions:recentTransactionType[]) => {
  const monthlyTotals:Record<string,number> = {};

  transactions.forEach(t => {
    const monthIndex = toJSDate(t.date).getMonth(); // 0–11
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

 export const getCategoryTotals = (transactions:recentTransactionType[]) => {
  const totals:Record<string,number> = {};

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


export const toJSDate = (date: string | Timestamp): Date => {
  if (date instanceof Timestamp) {
    return date.toDate();
  }
  return new Date(date);
};
