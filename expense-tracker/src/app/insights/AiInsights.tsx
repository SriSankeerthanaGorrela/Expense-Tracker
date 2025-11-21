export async function getAIInsights(analyticsData: any) {
  try {
    const res = await fetch("/api/insights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ analytics: analyticsData }),
    });

    if (!res.ok) throw new Error("API error");

    const data = await res.json();
    return data.insights;
  } catch (err) {
    console.error("AI ERROR:", err);
    return null;
  }
}
