import { useTranslation } from "react-i18next";

export const useGreetingAndMeal = (currentLanguage) => {
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

  let currentDate;

  switch (currentLanguage) {
    case "en":
      currentDate = capitalizeDate(date.toLocaleDateString("en-US", options));
      break;
    case "pt":
      currentDate = capitalizeDate(date.toLocaleDateString("pt", options));
      break;
    case "de":
      currentDate = capitalizeDate(date.toLocaleDateString("de", options));
      break;
    case "it":
      currentDate = capitalizeDate(date.toLocaleDateString("it", options));
      break;
    case "fr":
      currentDate = capitalizeDate(date.toLocaleDateString("fr", options));
      break;
    case "es":
      currentDate = capitalizeDate(date.toLocaleDateString("es", options));
      break;
    default:
      currentDate = capitalizeDate(date.toLocaleDateString("en-US", options));
  }

  function capitalizeDate(dateString) {
    // Split the date string by comma, and replace only the first comma with " • "
    const parts = dateString.split(/,\s*/);
    const capitalizedParts = parts.map(part => {
      // If the part is "de", keep it lowercase
      if (part.toLowerCase() === "de") {
        return part.toLowerCase();
      } else {
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      }
    });
    // Join the parts back into a string with " • " between the weekday and month
    return capitalizedParts.join(" • ");
  }

  return { greeting, meal, mealNumber, currentDate };
};