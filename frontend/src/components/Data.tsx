import React, { useEffect, useState } from "react";
import "./Data.css";

interface PushupData {
  grade: string;
  reps: number;
  goodReps: number;
}

interface DataProps {
  exercise: string;
}

const Data: React.FC<DataProps> = ({ exercise }) => {
  const [data, setData] = useState<PushupData>({
    grade: "",
    reps: 0,
    goodReps: 0,
  });

  const [goodWidth, setGood] = useState(0);
  const [totalWidth, setTotal] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource("/api/pushup_data_stream");

    eventSource.onmessage = (event) => {
      try {
        const parsedData: PushupData = JSON.parse(event.data);
        setData(parsedData);
        setGood(parsedData.goodReps);
        setTotal(parsedData.reps);
        console.log("Received data:", parsedData);
      } catch (err) {
        console.error("Failed to parse SSE data:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <div style={{ fontWeight: "bold" }}>
        <h2>{exercise} Tracker</h2>
        <p>Reps: {data.reps}</p>
        <p>Good Reps: {data.goodReps}</p>
        <p>Grade: {data.grade}</p>
      </div>
      <div className="ratioBox" style={{ width: "70%", margin: "20px" }}>
        <div
          className="good"
          style={{
            width: totalWidth ? `${(goodWidth / totalWidth) * 100}%` : "0%",
          }}
        />
        <div
          className="bad"
          style={{
            width: totalWidth
              ? `${((totalWidth - goodWidth) / totalWidth) * 100}%`
              : "0%",
          }}
        />
      </div>
    </>
  );
};

export default Data;
