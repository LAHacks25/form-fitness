import React, { useEffect, useState } from "react";

interface PushupData {
  reps: number;
  grade: string;
}

const Data: React.FC = () => {
  const [data, setData] = useState<PushupData>({ reps: 0, grade: "" });

  useEffect(() => {
    const eventSource = new EventSource(
      "http://127.0.0.1:5000/api/pushup_data_stream"
    );

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
      <h2>Pushup Tracker</h2>
      <p>Reps: {data.reps}</p>
      <p>Grade: {data.grade}</p>
    </div>
  );
};

export default Data;
