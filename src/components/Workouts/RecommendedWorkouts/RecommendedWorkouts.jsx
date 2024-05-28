import React, { useState } from "react";
import styles from "./RecommendedWorkouts.module.css";
import cardioIcon from "../../../assets/Icons/cardio.png";
import strengthIcon from "../../../assets/Icons/strength.png";
import yogaIcon from "../../../assets/Icons/yoga.png";
import openIcon from "../../../assets/Icons/open.png";
import lightOpenIcon from "../../../assets/Icons/open_hidden.png";

const RecommendedWorkouts = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null); // State to track hovered card index

  // Function to handle mouse enter event
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className={styles.container}>
      {/* Recommended workouts cards */}
      {[
        { icon: strengthIcon, label: "Push Workout", calorie: 350 },
        { icon: yogaIcon, label: "Yoga Session", calorie: 150 },
        { icon: strengthIcon, label: "Pull Workout", calorie: 350 },
        { icon: cardioIcon, label: "5km Run", calorie: 500 },
      ].map((workout, index) => (
        <div
          key={index}
          className={styles.card}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.workoutInfo}>
            <div className={styles.iconAndText}>
              <img
                src={workout.icon}
                alt="Workout Icon"
                className={styles.buttonIcon}
              />
              <div className={styles.textInfo}>
                <p>{workout.label}</p>
                <p>
                  <span>{workout.calorie} calorie burn</span>
                </p>
              </div>
              <img
                className={styles.openIcon}
                src={hoveredIndex === index ? openIcon : lightOpenIcon} // Change icon based on hover state
                alt="Open"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedWorkouts;
