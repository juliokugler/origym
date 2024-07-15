import React from "react";

const HeartRateTracker = () => {
  const heartRateData = {
    averageRate: "75 bpm",
    restingRate: "60 bpm",
  };

  return (
    <div>
      <p>Average Rate: {heartRateData.averageRate}</p>
      <p>Resting Rate: {heartRateData.restingRate}</p>
    </div>
  );
};

export default HeartRateTracker;
