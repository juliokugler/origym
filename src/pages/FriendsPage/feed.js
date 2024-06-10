import React, { useState, useEffect, useRef } from "react";
import styles from "./feed.module.css";
import lightning from "../../assets/Icons/Lightning_active.png";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import EmojiPicker from "emoji-picker-react";
import happyEmoji from "../../assets/Icons/Happy_emoji.png";

const Feed = ({ t, userId, userName, photoURL }) => {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const navigate = useNavigate();
  console.log("userId:", userId);

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  const toggleLike = async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      const postSnapshot = await getDoc(postRef);

      if (!postSnapshot.exists()) {
        console.error(`Post with ID ${postId} does not exist.`);
        return;
      }

      const post = postSnapshot.data();
      if (!post || !post.powerBoosts || !Array.isArray(post.powerBoosts)) {
        console.error(`Invalid post data for post with ID ${postId}.`);
        return;
      }

      // Rest of the toggleLike logic...
    } catch (error) {
      console.error("Error toggling like: ", error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === "") {
      setError("Content cannot be empty");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        powerBoosts: [],
        userId,
        content,
        author: userName,
        timestamp: serverTimestamp(),
        photoURL: photoURL,
      });
      setContent("");
      setError("");
      fetchPosts();
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  const fetchPosts = async () => {
    try {
      // Fetch the list of users the current user is following
      const followingQuery = query(collection(db, "users", userId, "follows"));
      const followingSnapshot = await getDocs(followingQuery);

      // Extract the followingIds from the documents
      const followingIds = [];
      followingSnapshot.forEach((doc) => {
        const followingId = doc.data().followingId;
        if (followingId) {
          followingIds.push(followingId);
        }
      });

      // Include the current user's ID in the list of followingIds
      followingIds.push(userId);

      // Query posts from the current user and followed users
      const postsQuery = query(
        collection(db, "posts"),
        where("userId", "in", followingIds),
        orderBy("timestamp", "desc"),
        limit(10)
      );

      const querySnapshot = await getDocs(postsQuery);
      const userPosts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        // Ensure powerBoosts is always initialized as an array
        return { ...data, powerBoosts: data.powerBoosts || [] };
      });
      setPosts(userPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <div className={styles.feedContainer}>
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
            <div className={styles.emojiPickerContainer} ref={emojiPickerRef}>
              <EmojiPicker
                onEmojiClick={(emojiObject) =>
                  setContent((prevContent) => prevContent + emojiObject.emoji)
                }
              />
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setShowEmojiPicker(false)}
              >
                ×
              </button>
            </div>
          )}
          <button
            type="button"
            className={styles.emojiButton}
            onClick={(e) => {
              e.preventDefault();
              setShowEmojiPicker(!showEmojiPicker);
            }}
          >
            <img src={happyEmoji} alt="Emoji" />
          </button>
          <button className="button-small" type="submit">
            {t("submit")}
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      {posts.map((post, index) => (
        <div key={index} className={styles.postCard}>
          <div
            className={styles.userImage}
            onClick={() => navigate(`/profile/${post.userId}`)}
          >
            {
              <img
                src={
                  post.photoURL
                    ? post.photoURL
                    : "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/Frame%20480%20(1).png?alt=media&token=598f9947-2ceb-43d7-b345-7c483944bcdd"
                }
              ></img>
            }
          </div>
          <p>{post.content}</p>
          <div
            onClick={() => toggleLike(post.id)} // Ensure post.id is the correct ID
            className={styles.powerBoosts}
          >
            <p>{post.powerBoosts.length}</p>{" "}
            <img src={lightning} alt="Lightning icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
