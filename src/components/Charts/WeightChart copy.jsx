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

const WeightGraph = ({ rerender }) => {
  const [weightData, setWeightData] = useState([]);
  const { user } = useAuthValue();

  useEffect(() => {
    const fetchWeightData = async () => {
      try {
        const firestore = getFirestore();
        const weightCollectionRef = collection(`users/${user.uid}/weight`);
        const weightQuery = query(weightCollectionRef, orderBy("date"));
        const weightSnapshot = await getDocs(weightQuery);
        const data = [];
        weightSnapshot.forEach((doc) => {
          const currentWeight = doc.data().weight;
          const currentDate = doc.data().date.toDate();
          const formattedDate = `${
            currentDate.getMonth() + 1
          }/${currentDate.getDate()}`;
          data.push({ date: formattedDate, weight: currentWeight });
        });

        if (data.length === 1) {
          const today = new Date(data[0].date);
          for (let i = 1; i < 5; i++) {
            today.setDate(today.getDate() - 1);
            const formattedDate = `${today.getMonth() + 1}/${today.getDate()}`;
            data.unshift({ date: formattedDate, weight: data[0].weight });
          }
        }

        setWeightData(data);
      } catch (error) {
        console.error("Error fetching weight data:", error);
      }
    };

    fetchWeightData();
  }, [rerender]);

  return (
    <ResponsiveContainer width="100%">
      <LineChart data={weightData}>
        <XAxis dataKey="date" />
        <YAxis domain={["dataMin", "dataMax"]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#FFF27A"
          strokeWidth={2}
          dot={{ fill: "#FFF27A" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeightGraph;
