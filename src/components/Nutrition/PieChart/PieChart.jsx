import React from "react";
import { Chart } from "react-google-charts";

export const App = ({ mealData, userData, dailyInfo, ingredientCalories }) => {
console.log(mealData)
  
  const data = [
    ["Type", "Calories"],
    ["Remaining Calories", dailyInfo.TDEE - dailyInfo.caloriesConsumed - (ingredientCalories? ingredientCalories : 0)],["Ingredient Calories", ingredientCalories],
    ["Consumed Calories", dailyInfo.caloriesConsumed],
    
  ];

  const options = {
    legend: "none",
    pieSliceText: "none",
    pieSliceBorderColor: "transparent",
    backgroundColor: {
      fill: "transparent",
    },
    pieHole: 0.85,
    is3D: false,
    slices: {
      0: { color: "#FFFFFF"}, // Remaining Calories 
      1: {color: "#FFF27A"},
      2: { color: "#35373D" }, // Consumed Calories
     
    },
    width: "26vh", // Set the width of the chart
    height: "26vh", // Set the height of the chart
  };

  return <Chart chartType="PieChart" data={data} options={options} />;
};
