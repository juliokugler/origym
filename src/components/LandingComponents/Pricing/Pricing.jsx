import React, { useState } from "react";
import styles from "./Pricing.module.css";
import { FaMedal, FaTrophy, FaCrown } from "react-icons/fa";

const Pricing = () => {
  const [activePlan, setActivePlan] = useState("Pro");

  const handleMouseEnter = (plan) => {
    setActivePlan(plan);
  };

  return (
    <div className={styles.pricing}>
      <h2>Choose Your Plan</h2>
      <h3>Affordable options for everyone</h3>
      <div className={styles.pricingTiers}>
        <div
          className={`${styles.pricingTier} ${activePlan === "Basic" ? styles.active : ""}`}
          onMouseEnter={() => handleMouseEnter("Basic")}
        >
          <FaMedal />
          <h4>Basic Plan</h4>
          <p>Free</p>
          <ul>
            <li>Access to basic workout plans</li>
            <li>Progress tracking</li>
          </ul>
          <button className="notSelectedButton-small">Try Now</button>
        </div>
        <div
          className={`${styles.pricingTier} ${activePlan === "Pro" ? styles.active : ""}`}
          onMouseEnter={() => handleMouseEnter("Pro")}
        >
          <FaTrophy />
          <h4>Pro Plan</h4>
          <p>$19.99/month</p>
          <ul>
            <li>Personalized coaching</li>
            <li>Advanced tracking</li>
            <li>Nutrition guides</li>
          </ul>
          <button className="notSelectedButton-small">Buy Now</button>
        </div>
        <div
          className={`${styles.pricingTier} ${activePlan === "Premium" ? styles.active : ""}`}
          onMouseEnter={() => handleMouseEnter("Premium")}
        >
          <FaCrown />
          <h4>Premium Plan</h4>
          <p>$29.99/month</p>
          <ul>
            <li>All Pro Plan features</li>
            <li>Exclusive content</li>
            <li>One-on-one coaching</li>
          </ul>
          <button className="notSelectedButton-small">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;