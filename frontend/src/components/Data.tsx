import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    const eventSource = new EventSource("/api/pushup_data_stream");

    eventSource.onmessage = (event) => {
      try {
        const parsedData: PushupData = JSON.parse(event.data);
        setData(parsedData);
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
    <div>
      <h2>{exercise} Tracker</h2>
      <p>Reps: {data.reps}</p>
      <p>Good Reps: {data.goodReps}</p>
      <p>Grade: {data.grade}</p>
    </div>
  );
};

export default Data;
