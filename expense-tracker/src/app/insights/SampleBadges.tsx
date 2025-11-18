export function sampleBadges(analytics = {}) {
  const {
    totalSpent = 0,
    totalSaved = 0,
    monthlyAverage = 0,
    spendingStreak = 0,
    categories = [],
  } = analytics;

  const badges = [];
  
  if (totalSaved > 5000) {
    badges.push({
      title: "Super Saver",
      description: "You saved more than ₹5,000 this month!",
      color: "green",
    });
  }

  if (totalSpent < monthlyAverage * 0.8) {
    badges.push({
      title: "Budget Boss",
      description: "You spent 20% less than your usual monthly average!",
      color: "blue",
    });
  }

  if (spendingStreak >= 7) {
    badges.push({
      title: "Consistency Champ",
      description: "7-day stable spending streak!",
      color: "purple",
    });
  }

  const highest = categories.sort((a, b) => b.value - a.value)[0];
  if (highest) {
    badges.push({
      title: `${highest.category} Master`,
      description: `Most spending in ${highest.category}.`,
      color: "orange",
    });
  }

  if (badges.length === 0) {
    badges.push({
      title: "Getting Started",
      description: "Track more data to unlock badges!",
      color: "gray",
    });
  }

  return badges;
}
