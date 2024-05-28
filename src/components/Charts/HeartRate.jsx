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

const HeartRate = () => {
  const [heartRateData, setHeartRateData] = useState([]);
  const { user } = useAuthValue();

  useEffect(() => {
    const fetchRecentHeartRateEntries = async () => {
      try {
        const firestore = getFirestore();
        const userHeartRateCollectionRef = collection(
          firestore,
          `health/${user.uid}/heartRate`
        );

        const querySnapshot = await getDocs(
          query(userHeartRateCollectionRef, orderBy("date", "asc"), limit(5))
        );

        const recentHeartRateEntries = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const date =
            data.date instanceof Timestamp
              ? data.date.toDate().toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                })
              : null;

          const peakHeartRate =
            typeof data.peak === "string" ? parseInt(data.peak) : data.peak;

          return {
            id: doc.id,
            date: date,
            averageHeartRate: data.average,
            peakHeartRate: peakHeartRate,
          };
        });

        setHeartRateData(recentHeartRateEntries);
      } catch (error) {}
    };
    fetchRecentHeartRateEntries();
  }, [user.uid]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={heartRateData}>
        <XAxis dataKey="date" />
        <YAxis domain={[20, 200]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="averageHeartRate"
          name="Average"
          stroke="#FEC04B"
          strokeWidth={2}
          dot={{ fill: "#FEC04B" }}
        />
        <Line
          type="monotone"
          dataKey="peakHeartRate"
          name="Peak"
          stroke="#FF524D"
          strokeWidth={2}
          dot={{ fill: "#FF524D" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HeartRate;
