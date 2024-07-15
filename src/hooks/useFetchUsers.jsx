import { useState, useEffect, useCallback } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const useFetchUsers = (searchTerm, currentUsername) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    if (!searchTerm) {
      setUsers([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("displayNameLower", ">=", searchTerm.toLowerCase()),
        where("displayNameLower", "<=", searchTerm.toLowerCase() + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);

      const fetchedUsers = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.displayNameLower !== currentUsername.toLowerCase()) {
          fetchedUsers.push({ id: doc.id, uid: doc.id, ...userData });
        }
      });

      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentUsername]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [fetchUsers, searchTerm, currentUsername]); 

  return { users, loading, error };
};

export default useFetchUsers;