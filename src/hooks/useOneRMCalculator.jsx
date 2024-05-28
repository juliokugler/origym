//React
import { useState } from "react";

const useOneRMCalculator = (weight, reps, t) => {
  const [oneRMResult, setOneRMResult] = useState(null);
  const [error, setError] = useState("");

  const calculateOneRM = () => {
    if (weight === "0" || reps === "0") {
      setError(`${t("greaterThanZero")}`);
      return;
    }

    if (weight === "" || reps === "") {
      setError(`${t("pleaseEnterBothWeightAndReps")}`);
      setOneRMResult("");
      return;
    }

    const oneRM = weight * (1 + reps / 30);

    const roundedOneRM = oneRM.toFixed(2);

    setOneRMResult(roundedOneRM);
  };

  return { weight, reps, oneRMResult, error, calculateOneRM };
};

export default useOneRMCalculator;
