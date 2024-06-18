import React  from "react";
import { FaStar } from "react-icons/fa";
import styles from "./Testimonials.module.css";
import johnDoe from "./avatar6.jpg";
import janeSmith from "./avatar5.jpg";
import mikeJohnson from "./avatar.png"

const Testimonials = () => {
  return (
    <div className={styles.testimonials}>
      <h2>Success Stories</h2>
      <h3>Hear from our satisfied members</h3>
      <div className={styles.testimonialList}>
        <div className={styles.testimonialItem}>
          <img src={johnDoe} alt="John Doe" />
          <div className={styles.testimonialContent}>
            <div className={styles.stars}>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
           
            <p>Origym helped me lose 20 pounds and gain muscle. The coaches are amazing!</p> <span>John Doe</span>
          </div>
        </div>
        <div className={styles.testimonialItem}>
          <img src={janeSmith} alt="Jane Smith" />
          <div className={styles.testimonialContent}>
            <div className={styles.stars}>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            
            <p>The personalized plans and nutrition guides were a game changer for me.</p><span>Jane Smith</span>
          </div>
        </div>
        <div className={styles.testimonialItem}>
          <img src={mikeJohnson} alt="Mike Johnson" />
          <div className={styles.testimonialContent}>
            <div className={styles.stars}>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            
            <p>I achieved my fitness goals faster than I imagined thanks to Origym's support.</p><span>Mike Johnson</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;