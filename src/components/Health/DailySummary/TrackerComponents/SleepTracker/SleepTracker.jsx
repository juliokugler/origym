import React from "react";
import styles from "./SleepTracker.module.css";
import { FaSquare } from "react-icons/fa";

const SleepTracker = ({t}) => {
  // Example segmented sleep data (in minutes)
  const sleepSegments = [
    { type: "Light Sleep", duration: 70 },
    { type: "Awake", duration: 3 },
    { type: "Deep Sleep", duration: 10 },
    { type: "Light Sleep", duration: 40 },
    { type: "Awake", duration: 1 },
    { type: "Deep Sleep", duration: 20 },
    { type: "Light Sleep", duration: 90 },
    { type: "Awake", duration: 2 },
    { type: "Deep Sleep", duration: 45 },
    { type: "Light Sleep", duration: 30 },
    { type: "Deep Sleep", duration: 45 },
  ];

  const totalMinutes = sleepSegments.reduce(
    (acc, segment) => acc + segment.duration,
    0
  );

  return (
    <div className={styles.sleepTracker}>
      <p className={styles.awakeTime}>
        <FaSquare /> {t("awake")}: 0h 5m
      </p>
      <p className={styles.lightSleep}>
        <FaSquare /> {t("lightSleep")}: 4h 30m
      </p>
      <p className={styles.deepSleep}>
        <FaSquare /> {t("deepSleep")}: 2h 0m
      </p>

      <div className={styles.progressContainer}>
        <div className={styles.progressBarWrapper}>
          {sleepSegments.map((segment, index) => {
            const segmentPercentage = (segment.duration / totalMinutes) * 100;
            const segmentColor =
              segment.type === "Deep Sleep"
                ? "#556677"
                : segment.type === "Light Sleep"
                ? "#8899AA"
                : "#FBFBFB";
            return (
              <div
                key={index}
                className={styles.progressSegment}
                style={{
                  width: `${segmentPercentage}%`,
                  backgroundColor: segmentColor,
                }}
              />
            );
          })}
        </div>
        <p className={styles.totalSleep}>{t("totalSleep")}: 5h 35m</p>
        <p>{t("wakeUpTime")}: 6:45 AM</p>
      </div>
    </div>
  );
};

export default SleepTracker;
