//React
import React, { useState, useEffect } from "react";

//Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

//Firebase
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  limit,
  Timestamp,
} from "firebase/firestore";

//Contexts
import { useAuthValue } from "../../contexts/AuthContext";

const WeightGraph = () => {
  const [weightData, setWeightData] = useState([]);
  const { user } = useAuthValue();

  useEffect(() => {
    const fetchRecentWeightEntries = async () => {
      try {
        const firestore = getFirestore();
        const userWeightCollectionRef = collection(
          firestore,
          `health/${user.uid}/weight`
        );

        const querySnapshot = await getDocs(
          query(userWeightCollectionRef, orderBy("date", "asc"), limit(5))
        );

        const recentWeightEntries = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          const date =
            data.date instanceof Timestamp
              ? data.date.toDate().toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                })
              : null;

          return {
            id: doc.id,
            date: date,
            weight: data.weight,
          };
        });

        setWeightData(recentWeightEntries); // Do not reverse the order here
      } catch (error) {
        console.error("Error fetching recent weight entries:", error);
      }
    };
    fetchRecentWeightEntries();
  }, [user.uid]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={weightData}>
        <XAxis dataKey="date" />
        <YAxis domain={["dataMin", "dataMax"]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#21762b"
          strokeWidth={2}
          dot={{ fill: "#21762b" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeightGraph;
