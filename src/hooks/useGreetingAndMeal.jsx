import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useGreetingAndMeal = (currentLanguage, switchLanguage) => {
  const { t } = useTranslation();

  const [greeting, setGreeting] = useState("");
  const [meal, setMeal] = useState("");
  const [mealNumber, setMealNumber] = useState(0);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    let newGreeting, newMeal, newMealNumber;

    if (hour >= 5 && hour < 9) {
      newGreeting = t("goodMorning");
      newMeal = "Breakfast";
      newMealNumber = 0;
    } else if (hour >= 7 && hour < 10) {
      newGreeting = t("goodMorning");
      newMeal = "Supplementation";
      newMealNumber = 4;
    } else if (hour >= 10 && hour < 13) {
      newGreeting = t("goodAfternoon");
      newMeal = "Lunch";
      newMealNumber = 1;
    } else if (hour >= 13 && hour < 16) {
      newGreeting = t("goodAfternoon");
      newMeal = "Supplementation";
      newMealNumber = 4;
    } else if (hour >= 16 && hour < 18) {
      newGreeting = t("goodAfternoon");
      newMeal = "Snacks";
      newMealNumber = 3;
    } else if (hour >= 18 && hour < 20) {
      newGreeting = t("goodEvening");
      newMeal = "Dinner";
      newMealNumber = 2;
    } else {
      newGreeting = t("goodEvening");
      newMeal = "Snacks";
      newMealNumber = 3;
    }

    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };

    let newCurrentDate;

    switch (currentLanguage) {
      case "en":
        newCurrentDate = capitalizeDate(date.toLocaleDateString("en-US", options));
        break;
      case "pt":
        newCurrentDate = capitalizeDate(date.toLocaleDateString("pt", options));
        break;
      case "de":
        newCurrentDate = capitalizeDate(date.toLocaleDateString("de", options));
        break;
      case "it":
        newCurrentDate = capitalizeDate(date.toLocaleDateString("it", options));
        break;
      case "fr":
        newCurrentDate = capitalizeDate(date.toLocaleDateString("fr", options));
        break;
      case "es":
        newCurrentDate = capitalizeDate(date.toLocaleDateString("es", options));
        break;
      default:
        newCurrentDate = capitalizeDate(date.toLocaleDateString("en-US", options));
    }

    function capitalizeDate(dateString) {
      const parts = dateString.split(/,\s*/);
      const capitalizedParts = parts.map(part => {
        if (part.toLowerCase() === "de") {
          return part.toLowerCase();
        } else {
          return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        }
      });
      return capitalizedParts.join(" • ");
    }

    setGreeting(newGreeting);
    setMeal(newMeal);
    setMealNumber(newMealNumber);
    setCurrentDate(newCurrentDate);
  }, [currentLanguage, t, switchLanguage]);

  return { greeting, meal, mealNumber, currentDate };
};

