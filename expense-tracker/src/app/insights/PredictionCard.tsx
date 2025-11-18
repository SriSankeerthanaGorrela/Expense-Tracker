"use client";

import React from "react";
import { calculatePredictions } from "./CalculatePredictions";

function PredictionCard({ transactions }) {
  const prediction = calculatePredictions(transactions);

  return (
    <div className="card">
      <h2 className="card-title">AI Predictions</h2>

      <p className="text-gray-700 text-sm mt-2">
        Next month expected spending: <b>₹{prediction.nextMonthPrediction}</b>
      </p>

      <p className="text-xs text-gray-500 mt-1">
        Trend: <b>{prediction.trend}</b>
      </p>
    </div>
  );
}

export default PredictionCard;
