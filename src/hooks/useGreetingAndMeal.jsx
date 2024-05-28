import { useTranslation } from "react-i18next";

export const useGreetingAndMeal = () => {
  const { t } = useTranslation();
  const date = new Date();
  const hour = date.getHours();

  let greeting, meal, mealNumber;

  if (hour >= 5 && hour < 9) {
    greeting = t("goodMorning");
    meal = "Breakfast";
    mealNumber = 0;
  } else if (hour >= 7 && hour < 10) {
    greeting = t("goodMorning");
    meal = "Supplementation";
    mealNumber = 4;
  } else if (hour >= 10 && hour < 13) {
    greeting = t("goodAfternoon");
    meal = "Lunch";
    mealNumber = 1;
  } else if (hour >= 13 && hour < 16) {
    greeting = t("goodAfternoon");
    meal = "Supplementation";
    mealNumber = 4;
  } else if (hour >= 16 && hour < 18) {
    greeting = t("goodAfternoon");
    meal = "Snacks";
    mealNumber = 3;
  } else if (hour >= 18 && hour < 20) {
    greeting = t("goodEvening");
    meal = "Dinner";
    mealNumber = 2;
  } else {
    greeting = t("goodEvening");
    meal = "Snacks";
    mealNumber = 3;
  }

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const currentDate = date
    .toLocaleDateString("en-US", options)
    .replace(", ", " • ");

  return { greeting, meal, mealNumber, currentDate };
};
