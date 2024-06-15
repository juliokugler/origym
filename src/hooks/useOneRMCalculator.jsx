import { useState } from "react";

const useOneRMCalculator = (weight, reps, t) => {
  const [oneRMResults, setOneRMResults] = useState([]);
  const [error, setError] = useState("");

  const calculateOneRM = () => {
    if (weight === "0" || reps === "0") {
      setError(`${t("greaterThanZero")}`);
      return;
    }

    if (weight === "" || reps === "") {
      setError(`${t("pleaseEnterBothWeightAndReps")}`);
      setOneRMResults([]);
      return;
    }

    const results = [];
    for (let i = 1; i <= 12; i++) {
      const rm = weight * (1 + (reps - i) / 30);
      results.push({ reps: i, value: rm.toFixed(1) });
    }

    setOneRMResults(results);
    setError("");
  };

  return { weight, reps, oneRMResults, error, calculateOneRM };
};

export default useOneRMCalculator;