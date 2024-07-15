//React
import React, { useState, useEffect } from "react";

//Dependencies
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
} from "firebase/firestore";

//Contexts
import { useAuthValue } from "../../../../../contexts/AuthContext";

const WeightTracker = ({ rerender }) => {
  const [weightData, setWeightData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthValue();

  useEffect(() => {
    const fetchWeightData = async () => {
      try {
        const firestore = getFirestore();
        const weightCollectionRef = collection(
          firestore,
          `users/${user.uid}/weight`
        );
        const weightQuery = query(weightCollectionRef, orderBy("date"));
        const weightSnapshot = await getDocs(weightQuery);

        const data = weightSnapshot.docs.map((doc) => {
          const currentWeight = doc.data().weight;
          const currentDate = doc.data().date.toDate();
          const formattedDate = `${
            currentDate.getMonth() + 1
          }/${currentDate.getDate()}`;
          return { date: formattedDate, weight: currentWeight };
        });

        setWeightData(data);
      } catch (error) {
        console.error("Error fetching weight data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeightData();
  }, [user.uid, rerender]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="50%">
      <LineChart data={weightData}>
        <XAxis dataKey="date" />
        <YAxis domain={["dataMin", "dataMax"]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#2e3035"
          strokeWidth={2}
          dot={{ fill: "#2e3035" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeightTracker;
