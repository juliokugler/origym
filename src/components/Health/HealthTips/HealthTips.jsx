import React from "react";
import styles from "./HealthTips.module.css";

const HealthTips = () => {
  const blogPosts = [
    {
      title: "10 Tips for Better Sleep",
      description:
        "Discover effective strategies to improve your sleep quality.",
      image:
        "https://images.unsplash.com/photo-1512548438457-4c9584d3766b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvcm1pcnxlbnwwfHwwfHx8MA%3D%3D",
      link: "https://example.com/better-sleep",
    },
    {
      title: "Hydration: Why It's Important",
      description: "Learn why staying hydrated is crucial for your health.",
      image:
        "https://images.unsplash.com/photo-1600679472233-eabc13b79f07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "https://example.com/hydration",
    },
    {
      title: "How to Track Your Steps Effectively",
      description: "Tips on how to make the most out of your step tracking.",
      image:
        "https://images.unsplash.com/photo-1526573461737-b504d8040d92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFuZGFyfGVufDB8fDB8fHww",
      link: "https://example.com/track-steps",
    },
    {
      title: "Weight Management: Do's and Don'ts",
      description: "Essential guidelines for managing your weight.",
      image:
        "https://images.unsplash.com/photo-1523901839036-a3030662f220?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVzYXJ8ZW58MHx8MHx8fDA%3D",
      link: "https://example.com/weight-management",
    },
    {
      title: "Understanding Heart Rate Variability",
      description: "What heart rate variability tells you about your health.",
      image:
        "https://images.unsplash.com/photo-1523395243481-163f8f6155ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJhdGltZW50byUyMGNhcmRpYWNvfGVufDB8fDB8fHww",
      link: "https://example.com/heart-rate",
    },
  ];

  return (
    <div className={styles.healthTips}>
      {blogPosts.map((post, index) => (
        <a
          key={index}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.blogPost}
        >
          <img src={post.image} alt={post.title} className={styles.blogImage} />
          <div className={styles.blogContent}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default HealthTips;
