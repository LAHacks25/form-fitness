import React, { useState, useEffect } from "react";
import "./DashBoxes.css";
import VideoFile from "./VideoFile";
import Data from "./Data";

interface DashBoxesProps {
  exercise: string;
  hidden: boolean;
}

const DashBoxes: React.FC<DashBoxesProps> = ({ exercise, hidden }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [exerciseFormatted, setExerciseFormatted] = useState("");

  useEffect(() => {
    if (exercise === "pushups") {
      setExerciseFormatted("Push Up");
    } else if (exercise === "legraise") {
      setExerciseFormatted("Leg Raise");
    } else {
      setExerciseFormatted("Shoulder Press");
    }
  }, [exercise]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    fetch("/api/stop_camera", { method: "GET" })
      .then((response) => response.json())
      .then((data) => console.log(data.message));
    setIsRecording(false);
  };

  return (
    <div className={`dashBoxesContainer`}>
      <div className="video">
        <p className="selection">{`You are recording ${exercise}`}</p>
        {!isRecording ? (
          <button
            className={`startButton ${hidden ? "hidden" : ""}`}
            onClick={startRecording}
          >
            Start Recording
          </button>
        ) : (
          <VideoFile hidden={false} />
        )}
        <div className={`buttonRow ${hidden ? "hidden" : ""}`}>
          {isRecording && (
            <button className="stopButton" onClick={stopRecording}>
              End Recording
            </button>
          )}
        </div>
      </div>
      <div className={`right-box ${hidden ? "hidden" : ""}`}>
        <Data exercise={exerciseFormatted} />
      </div>
    </div>
  );
};

export default DashBoxes;
