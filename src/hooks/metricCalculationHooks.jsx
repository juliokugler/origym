import { useState, useEffect } from "react";

export const useTDEECalculation = (
  gender,
  age,
  height,
  weight,
  goalWeight,
  activityLevel
) => {
  const [TDEE, setTDEE] = useState("");

  useEffect(() => {
    let BMR = 0;
    if (gender === "Male") {
      BMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else if (gender === "Female") {
      BMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    } else {
      BMR =
        (88.362 +
          13.397 * weight +
          4.799 * height -
          5.677 * age +
          447.593 +
          9.247 * weight +
          3.098 * height -
          4.33 * age) /
        2;
    }

    let activityFactor = 1.2;
    switch (activityLevel) {
      case "Lightly Active":
        activityFactor = 1.375;
        break;
      case "Moderately Active":
        activityFactor = 1.55;
        break;
      case "Very Active":
        activityFactor = 1.725;
        break;
      case "Highly Active":
        activityFactor = 1.9;
        break;
      default:
        break;
    }

    let calorieAdaptation = 0;
    if (goalWeight > weight) {
      calorieAdaptation = +500;
    } else if (goalWeight < weight) {
      calorieAdaptation = -500;
    }

    const TDEE = BMR * activityFactor + calorieAdaptation;
    setTDEE(TDEE.toFixed(0));
  }, [gender, age, height, weight, goalWeight, activityLevel]);

  return TDEE;
};

export const useWaterIntakeCalculation = (gender, weight, activityLevel) => {
  const [waterIntake, setWaterIntake] = useState("");

  useEffect(() => {
    let waterIntake = 35 * weight; // ml per kg
    if (gender === "Female") {
      waterIntake *= 0.9; // reduce for females
    }

    switch (activityLevel) {
      case "Lightly Active":
        waterIntake *= 1.1;
        break;
      case "Moderately Active":
        waterIntake *= 1.2;
        break;
      case "Very Active":
        waterIntake *= 1.3;
        break;
      case "Highly Active":
        waterIntake *= 1.4;
        break;
      default:
        break;
    }

    setWaterIntake((waterIntake / 1000).toFixed(2));
  }, [gender, weight, activityLevel]);

  return waterIntake;
};

export const useProteinIntakeCalculation = (gender, weight) => {
  const [proteinIntake, setProteinIntake] = useState("");

  useEffect(() => {
    let proteinIntake = 0;
    if (gender === "Male") {
      proteinIntake = weight * 2.2; // grams per kg for men
    } else if (gender === "Female") {
      proteinIntake = weight * 2; // grams per kg for women
    } else {
      proteinIntake = weight * 2.1;
    }
    setProteinIntake(proteinIntake.toFixed(1));
  }, [gender, weight]);

  return proteinIntake;
};

export const useCarbsIntakeCalculation = (activityLevel) => {
  const [carbsIntake, setCarbsIntake] = useState("");

  useEffect(() => {
    let carbsIntake = 300; // default value
    switch (activityLevel) {
      case "Lightly Active":
        carbsIntake -= 50;
        break;
      case "Moderately Active":
        carbsIntake -= 100;
        break;
      case "Very Active":
        carbsIntake -= 150;
        break;
      case "Highly Active":
        carbsIntake -= 200;
        break;
      default:
        break;
    }
    setCarbsIntake(carbsIntake.toFixed(1));
  }, [activityLevel]);

  return carbsIntake;
};

export const useFatIntakeCalculation = (gender, weight) => {
  const [fatIntake, setFatIntake] = useState("");

  useEffect(() => {
    let fatIntake = 0;
    if (gender === "Male") {
      fatIntake = weight * 0.4; // grams per kg for men
    } else if (gender === "Female") {
      fatIntake = weight * 0.3; // grams per kg for women
    } else {
      fatIntake = (weight * 0.4 + weight * 0.3) / 2;
    }
    setFatIntake(fatIntake.toFixed(1));
  }, [gender, weight]);

  return fatIntake;
};
