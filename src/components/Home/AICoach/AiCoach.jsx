//React
import React, { useState, useEffect } from "react";

//Styles
import styles from "./AICoach.module.css";

//Components
import SpeechContainer from "./SpeechContainer";

//Assets
import send from "../../../assets/Icons/send.png";

/*
Not Functional, serves as an example for the implementation of an AI Coach implemented by ChatGPT 4,  
It renders the first messages then for the last one it conditionally renders either the loader or the last message.
The loader lasts 5 seconds and after that it gets replaced for the actual message. 
*/

const AiCoach = ({ userData, timedGreeting, t }) => {
  const [showLastMessage, setShowLastMessage] = useState(false);

  const [initialMessagesRendered, setInitialMessagesRendered] = useState(false);

  useEffect(() => {
    if (initialMessagesRendered) {
      const timer = setTimeout(() => {
        setShowLastMessage(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [initialMessagesRendered]);

  useEffect(() => {
    if (
      userData &&
      userData.userProfile &&
      userData.userProfile.firstName
    ) {
      setInitialMessagesRendered(true);
    }
  }, [userData]);

  return (
    <div>
      <div className={styles.speechContainer}>
        <SpeechContainer
          speaker="Coach"
          message={`${timedGreeting}, ${
            userData.userProfile.firstName || ""
          }! ${t("firstMessage")}`}
        />
        <SpeechContainer speaker="You" message={`${t("secondMessage")}`} />

        {!showLastMessage && (
          <div>
            <SpeechContainer
              speaker="Coach"
              message={<div className="loader"></div>}
            />
          </div>
        )}
        {showLastMessage && (
          <SpeechContainer speaker="Coach" message={`${t("thirdMessage")}`} />
        )}
      </div>
      <label className={styles.responseContainer}>
        <input type="text"></input>
        <img src={send} alt="Send" />
      </label>
    </div>
  );
};

export default AiCoach;
