import React, { useState, useEffect, useRef } from 'react';
import styles from "./PersonalFeed.module.css";
import lightning from "../../../assets/Icons/Lightning_active.png";
import { db } from '../../../firebase/config';
import { collection, addDoc, serverTimestamp, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import EmojiPicker from 'emoji-picker-react';
import happyEmoji from "../../../assets/Icons/Happy_emoji.png";

const PersonalFeed = ({ t, userId, userName, photoURL, friendInfo, isMobile }) => {
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === '') {
      setError('Content cannot be empty');
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        powerBoosts: [],
        userId,
        content,
        author: userName,
        timestamp: serverTimestamp(),
        photoURL: photoURL
      });
      setContent('');
      setError('');
      fetchPosts();
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  const fetchPosts = async () => {
    const postsQuery = query(
      collection(db, 'posts'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(10)
    );

    const querySnapshot = await getDocs(postsQuery);
    const userPosts = querySnapshot.docs.map(doc => doc.data());
    setPosts(userPosts);
  };

  useEffect(() => {
    setPosts([]); // Clear posts when userId changes
    fetchPosts();
  }, [userId]); // Add userId to the dependency array

  return (
    <div className={styles.feedContainer}>{!friendInfo && (
      <form onSubmit={handleSubmit}>
        <label className={styles.personalFeedLabel}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="No que você está pensando?"
          />
        </label>
        <div className={styles.submitRow}>
        {showEmojiPicker && (
  !isMobile ? (<>
    <div className={styles.emojiPickerContainer} ref={emojiPickerRef}>
      <EmojiPicker onEmojiClick={(emojiObject) => setContent(prevContent => prevContent + emojiObject.emoji)} />
      <button type='button' className={styles.closeButton} onClick={() => setShowEmojiPicker(false)}>×</button>
    </div><button type='button' className={styles.emojiButton} onClick={(e) => {
            e.preventDefault();
            setShowEmojiPicker(!showEmojiPicker);
          }}>
            <img src={happyEmoji} alt="Emoji" />
          </button></>
  ) : null
)}
          
          <button className="button-small" type="submit">{t("submit")}</button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>)}
      {posts.map((post, index) => (
        <div key={index} className={styles.postCard}>
          <p>{post.content}</p>
          <div className={styles.powerBoosts}>
            <p>{post.powerBoosts.length}</p> <img src={lightning} alt="Lightning icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonalFeed;