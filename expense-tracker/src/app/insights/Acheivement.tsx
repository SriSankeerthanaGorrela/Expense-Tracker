"use client";

import React from "react";
import { sampleBadges } from "./SampleBadges";

function AchievementBadges({ analytics }) {
  const badges = sampleBadges(analytics || {}); // prevent undefined crash

  return (
    <div className="card">
      <h2 className="card-title">Your Achievements</h2>

      <div className="flex gap-4 mt-3 flex-wrap">
        {badges.map((b, i) => (
          <div
            key={i}
            className={`badge bg-${b.color}-200 px-3 py-2 rounded-lg text-sm`}
          >
            <p className="font-semibold">{b.title}</p>
            <p className="text-gray-600 text-xs">{b.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AchievementBadges;
