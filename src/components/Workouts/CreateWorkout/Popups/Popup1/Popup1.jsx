import React, { useState, useEffect } from "react";
import styles from "./Popup1.module.css";
import GroupSelection from "./WorkoutGroupSelection/GroupSelection";

const Popup1 = ({ onNext, selectedDay }) => {
  const [name, setName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selectedDays, setSelectedDays] = useState([selectedDay]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState("Strength");
  const [isNameChanged, setIsNameChanged] = useState(false);

  const toggleDaySelection = (day) => {
    setSelectedDays((prevSelectedDays) => {
      const index = prevSelectedDays.indexOf(day);
      if (index === -1) {
        return [...prevSelectedDays, day];
      } else {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      }
    });
  };

  let workout;
  switch (selectedType) {
    case "Strength":
    case "Crossfit":
      workout = "Workout";
      break;
    case "Cardio":
    case "Yoga":
      workout = "Session";
      break;
    case "Martial Arts":
    case "Pilates":
      workout = "Class";
    default:
      workout = "";
  }

  useEffect(() => {
    setName(`${selectedType} ${workout}`);
  }, [selectedType]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setIsNameChanged(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setIsNameChanged(true);
  };

  const handleSelectedOptionsChange = (options) => {
    setSelectedOptions(options);
  };

  const handleNextClick = () => {
    if (name.trim() && selectedOptions.length > 0) {
      onNext(name, selectedOptions, selectedDays, selectedType);
    } else {
      alert(
        "Please enter a workout name and select at least one muscle group."
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2>New Workout</h2>
      <div className={styles.row}>
        <label>
          <p>Workout Name:</p>
          <input
            onClick={() => (isNameChanged ? "" : setName(""))}
            className={styles.input}
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter Workout Name"
          />
        </label>

        <label>
          <p>Workout Type:</p>
          <select
            className={styles.selectionInput}
            value={selectedType}
            onChange={handleTypeChange}
          >
            <option>Strength</option>
            <option>Cardio</option>
            <option>Crossfit</option>
            <option>Yoga</option>
            <option>Pilates</option>
            <option>Martial Arts</option>
            <option>Group Fitness Classes</option>
          </select>
        </label>
      </div>

      <GroupSelection
        selectedType={selectedType}
        onChange={handleSelectedOptionsChange}
      />
      <label className={styles.label}>
        <p>Assign Day(s) of the Week</p>
        <div className={styles.daysContainer}>
          {days.map((day) => (
            <div
              key={day}
              className={`${styles.dayCircle} ${
                selectedDays.includes(day) ? styles.selectedDay : ""
              }`}
              onClick={() => toggleDaySelection(day)}
            >
              {day}
            </div>
          ))}
        </div>
      </label>
      <div className={styles.buttonContainer}>
        <button
          className="inactiveButton-medium"
          onClick={handleNextClick}
        >
          Next
        </button>
     </div>
    </div>
  );
};

export default Popup1;
