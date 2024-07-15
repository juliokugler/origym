import { useEffect, useState } from "react";

const useCurrentDay = () => {
  const [currentDay, setCurrentDay] = useState(null);

  useEffect(() => {
    const getCurrentDay = () => {
      const today = new Date();
      const days = [
        { dayNameAbbreviation: "sun", dayName: "Sunday", dayId: 0 },
        { dayNameAbbreviation: "mon", dayName: "Monday", dayId: 1 },
        { dayNameAbbreviation: "tue", dayName: "Tuesday", dayId: 2 },
        { dayNameAbbreviation: "wed", dayName: "Wednesday", dayId: 3 },
        { dayNameAbbreviation: "thu", dayName: "Thursday", dayId: 4 },
        { dayNameAbbreviation: "fri", dayName: "Friday", dayId: 5 },
        { dayNameAbbreviation: "sat", dayName: "Saturday", dayId: 6 },
      ];
      return days[today.getDay()];
    };

    setCurrentDay(getCurrentDay());
  }, []);

  return currentDay;
};

export default useCurrentDay;
