// src/hooks/useTheme.js
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const useTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, toggleTheme };
};
